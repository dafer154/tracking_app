import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";

// declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard/main', title: 'Mis Servicios', icon: 'dashboard', class: '' },
  { path: '/dashboard/user-profile', title: 'User Profile', icon: 'person', class: '' },
  { path: '/dashboard/table-list', title: 'Table List', icon: 'content_paste', class: '' },
  // { path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
  // { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  // { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar-dashboard',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponentDashboard implements OnInit {
  menuItems: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
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
