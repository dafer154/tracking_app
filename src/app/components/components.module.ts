import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { LandingPageComponent } from 'src/app/components/landing-page/landing-page.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { MerchandiseComponent } from 'src/app/components/merchandise/merchandise.component';
import { MainBannerComponent } from 'src/app/components/main-banner/main-banner.component';
import { SelectTransportComponent } from 'src/app/components/select-transport/select-transport.component';
import { CarouselSliderComponent } from 'src/app/components/carousel-slider/carousel-slider.component';
import { PlatformComponent } from 'src/app/components/platform/platform.component';
import { SidebarServiceComponent } from 'src/app/components/sidebar-service/sidebar-service.component';
import { SelectVehicleComponent } from 'src/app/components/select-vehicle/select-vehicle.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { AlertsComponent } from 'src/app/components/alerts/alerts.component';
import { EditServicesComponent } from 'src/app/components/edit-services/edit-services.component';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { UsersListComponent } from 'src/app/components/users-list/users-list.component';
import { ServicesListComponent } from 'src/app/components/services-list/services-list.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { RolesService } from 'src/app/services/roles/roles.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UsersService } from 'src/app/services/users/users.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { ServiceTrakingService } from 'src/app/services/service-tracking/service-traking.service';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
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
        SelectVehicleComponent,
        SignupComponent,
        AlertsComponent,
        EditServicesComponent,
        PopupComponent,
        UsersListComponent,
        ServicesListComponent,
        GoogleMapsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        GoogleMapsModule,
    ],
    exports: [
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
        SelectVehicleComponent,
        SignupComponent,
        AlertsComponent,
        EditServicesComponent,
        PopupComponent,
        UsersListComponent,
        ServicesListComponent,
    ],
    entryComponents: [
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
        SelectVehicleComponent,
        SignupComponent,
        AlertsComponent,
        EditServicesComponent,
        PopupComponent,
        UsersListComponent,
        ServicesListComponent,
    ],
    providers: [
        LocalstorageService, RolesService, LoginService, AuthService, UsersService, CitiesService, VehiclesService, ServiceTrakingService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class GeneralComponentsModule { }