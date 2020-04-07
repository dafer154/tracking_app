// MODULES
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import es from '@angular/common/locales/es';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneralComponentsModule } from 'src/app/components/components.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './helpers/error-interceptor';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GeneralComponentsModule,
    DashboardModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
