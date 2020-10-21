package br.com.ais.pontoeletronico.config

import br.com.ais.pontoeletronico.gateway.accesscontrol.AccessControlFilter
import br.com.ais.pontoeletronico.gateway.ratelimiting.RateLimitingFilter
import br.com.ais.pontoeletronico.gateway.responserewriting.SwaggerBasePathRewritingFilter
import io.github.jhipster.config.JHipsterProperties
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.cloud.netflix.zuul.filters.RouteLocator
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class GatewayConfiguration {

    @Configuration
    class SwaggerBasePathRewritingConfiguration {
        @Bean
        fun swaggerBasePathRewritingFilter() = SwaggerBasePathRewritingFilter()
    }

    @Configuration
    class AccessControlFilterConfiguration {
        @Bean
        fun accessControlFilter(routeLocator: RouteLocator, jHipsterProperties: JHipsterProperties) =
            AccessControlFilter(routeLocator, jHipsterProperties)
    }

    /**
     * Configures the Zuul filter that limits the number of API calls per user.
     *
     *
     * This uses Bucket4J to limit the API calls, see [br.com.ais.pontoeletronico.gateway.ratelimiting.RateLimitingFilter].
     */
    @Configuration
    @ConditionalOnProperty("jhipster.gateway.rate-limiting.enabled")
    class RateLimitingConfiguration(private val jHipsterProperties: JHipsterProperties) {
        @Bean
        fun rateLimitingFilter() = RateLimitingFilter(jHipsterProperties)
    }
}
