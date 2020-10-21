import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { PontoeletronicoWebSharedModule } from 'app/shared/shared.module';
import { PontoeletronicoWebCoreModule } from 'app/core/core.module';
import { PontoeletronicoWebAppRoutingModule } from './app-routing.module';
import { PontoeletronicoWebHomeModule } from './home/home.module';
import { PontoeletronicoWebEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    PontoeletronicoWebSharedModule,
    PontoeletronicoWebCoreModule,
    PontoeletronicoWebHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    PontoeletronicoWebEntityModule,
    PontoeletronicoWebAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class PontoeletronicoWebAppModule {}
