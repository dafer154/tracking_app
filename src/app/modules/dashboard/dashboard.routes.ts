import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from 'src/app/helpers/auth-guard';

export const DashboardRoutes: Routes = [
    { path: 'main', component: MainComponent },
    { path: 'users', component: UserProfileComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
];
