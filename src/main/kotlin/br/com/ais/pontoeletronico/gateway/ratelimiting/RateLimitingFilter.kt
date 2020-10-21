package br.com.ais.pontoeletronico.gateway.ratelimiting

import br.com.ais.pontoeletronico.security.getCurrentUserLogin
import com.netflix.zuul.ZuulFilter
import com.netflix.zuul.context.RequestContext
import io.github.bucket4j.Bandwidth
import io.github.bucket4j.Bucket4j
import io.github.bucket4j.BucketConfiguration
import io.github.bucket4j.grid.GridBucketState
import io.github.bucket4j.grid.ProxyManager
import io.github.bucket4j.grid.jcache.JCache
import io.github.jhipster.config.JHipsterProperties
import java.time.Duration
import java.util.function.Supplier
import javax.cache.Caching
import javax.cache.configuration.MutableConfiguration
import javax.servlet.http.HttpServletRequest
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus

/**
 * Zuul filter for limiting the number of HTTP calls per client.
 *
 * See the Bucket4j documentation at https://github.com/vladimir-bukhtoyarov/bucket4j
 * https://github.com/vladimir-bukhtoyarov/bucket4j/blob/master/doc-pages/jcache-usage
 * .md#example-1---limiting-access-to-http-server-by-ip-address
 */
class RateLimitingFilter(private val jHipsterProperties: JHipsterProperties) : ZuulFilter() {

    private val log = LoggerFactory.getLogger(javaClass)

    private val cache: javax.cache.Cache<String, GridBucketState>

    private val buckets: ProxyManager<String>

    private val configSupplier: Supplier<BucketConfiguration>
        get() = Supplier {
            val rateLimitingProperties = jHipsterProperties.gateway.rateLimiting

            Bucket4j.configurationBuilder()
                .addLimit(
                    Bandwidth.simple(
                        rateLimitingProperties.limit,
                        Duration.ofSeconds(rateLimitingProperties.durationInSeconds.toLong())
                    )
                )
                .build()
        }

    init {

        val cachingProvider = Caching.getCachingProvider()
        val cacheManager = cachingProvider.cacheManager
        val config = MutableConfiguration<String, GridBucketState>()
            .setTypes(String::class.java, GridBucketState::class.java)

        this.cache = cacheManager.createCache(GATEWAY_RATE_LIMITING_CACHE_NAME, config)
        this.buckets = Bucket4j.extension(JCache::class.java).proxyManagerForCache(cache)
    }

    override fun filterType() = "pre"

    override fun filterOrder() = 10

    // specific APIs can be filtered out using
    // if (RequestContext.getCurrentContext().getRequest().getRequestURI().startsWith("/api")) { ... }
    override fun shouldFilter() = true

    override fun run(): Any? {
        val bucketId = getId(RequestContext.getCurrentContext().request)
        val bucket = buckets.getProxy(bucketId, configSupplier)
        if (bucket.tryConsume(1)) {
            // the limit is not exceeded
            log.debug("API rate limit OK for $bucketId")
        } else {
            // limit is exceeded
            log.info("API rate limit exceeded for $bucketId")
            apiLimitExceeded()
        }
        return null
    }

    /**
     * Create a Zuul response error when the API limit is exceeded.
     */
    private fun apiLimitExceeded() {
        RequestContext.getCurrentContext().apply {
            responseStatusCode = HttpStatus.TOO_MANY_REQUESTS.value()
            if (responseBody == null) {
                responseBody = "API rate limit exceeded"
                setSendZuulResponse(false)
            }
        }
    }

    /**
     * The ID that will identify the limit: the user login or the user IP address.
     */
    private fun getId(httpServletRequest: HttpServletRequest): String =
        getCurrentUserLogin().orElse(httpServletRequest.remoteAddr)

    companion object {
        const val GATEWAY_RATE_LIMITING_CACHE_NAME = "gateway-rate-limiting"
    }
}
