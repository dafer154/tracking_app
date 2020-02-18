import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { MerchandiseComponent } from './components/merchandise/merchandise.component';
import { MainBannerComponent } from './components/main-banner/main-banner.component';
import { SelectTransportComponent } from 'src/app/components/select-transport/select-transport.component';
import { CarouselSliderComponent } from 'src/app/components/carousel-slider/carousel-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    FooterComponent,
    LoginComponent,
    MerchandiseComponent,
    MainBannerComponent,
    SelectTransportComponent,
    CarouselSliderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
