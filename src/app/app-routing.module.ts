import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PlatformComponent } from './components/platform/platform.component';


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
    path: '*',
    redirectTo: '/home'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
