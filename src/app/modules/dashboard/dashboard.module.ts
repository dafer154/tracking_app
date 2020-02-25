import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.routes';
import { MaterialModule } from 'src/app/modules/material/material.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    RouterModule.forChild(DashboardRoutes),
  ],
  exports: [DashboardComponent],
  entryComponents: [DashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }
