import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponentDashboard } from './navbar/navbar.component';
import { SidebarComponentDashboard } from './sidebar/sidebar.component';
import { FooterComponentDashboard } from './footer/footer.component';
import { TableListComponent } from './table-list/table-list.component';
import { MainComponent } from './main/main.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/login/login.service';
import { RoutesListComponent } from '../../../components/routes-list/routes-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertsComponentDashboard } from '../components/alerts/alerts.component';
import { GeneralComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [NavbarComponentDashboard, SidebarComponentDashboard, FooterComponentDashboard, TableListComponent, MainComponent, UserProfileComponent, RoutesListComponent, AlertsComponentDashboard],
  imports: [
    CommonModule,
    GeneralComponentsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),

  ],
  exports: [
    FooterComponentDashboard,
    NavbarComponentDashboard,
    SidebarComponentDashboard,
  ],
  entryComponents: [
    FooterComponentDashboard,
    NavbarComponentDashboard,
    SidebarComponentDashboard,
  ],
  providers: [LocalstorageService, LoginService, AuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
