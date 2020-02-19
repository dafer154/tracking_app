import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { PlatformComponent } from './components/platform/platform.component';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { SidebarServiceComponent } from './components/sidebar-service/sidebar-service.component';
import { SelectVehicleComponent } from './components/select-vehicle/select-vehicle.component';

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
    CarouselSliderComponent,
    PlatformComponent,
    SidebarServiceComponent,
    SelectVehicleComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LocalstorageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
