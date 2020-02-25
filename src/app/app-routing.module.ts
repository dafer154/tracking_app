import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PlatformComponent } from './components/platform/platform.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path: 'home',
    component: LandingPageComponent,
  },
  {
    path: 'platform',
    component: PlatformComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [{
      path: '',
      loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
    }]
  },
  {
    path: '*',
    redirectTo: '/home'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
