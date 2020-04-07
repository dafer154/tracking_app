import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { AuthService } from 'src/app/services/auth/auth.service';

// declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard/main', title: 'Mis Servicios', icon: 'dashboard', class: '' },
  { path: '/dashboard/users', title: 'Gestión De Usuarios', icon: 'person', class: '' },
];

@Component({
  selector: 'app-sidebar-dashboard',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponentDashboard implements OnInit {
  menuItems: any[];

  constructor(private router: Router, private $authService: AuthService) { }

  ngOnInit() {
    if (this.$authService.isAdmin()) {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    } else {
      this.menuItems = ROUTES.filter(menuItem => menuItem.icon != 'person');
    }

  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  changeRoute(index: number) {
    switch (index) {
      case 0: this.router.navigate([this.menuItems[0].path]);
        break;
      case 1: this.router.navigate([this.menuItems[1].path]);
        break;
      case 2: this.router.navigate([this.menuItems[2].path]);
        break;
    }
  }
}
