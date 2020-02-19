import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-service',
  templateUrl: './sidebar-service.component.html',
  styleUrls: ['./sidebar-service.component.scss']
})
export class SidebarServiceComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
