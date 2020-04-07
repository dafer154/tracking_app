import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar-service',
  templateUrl: './sidebar-service.component.html',
  styleUrls: ['./sidebar-service.component.scss']
})
export class SidebarServiceComponent implements OnInit, OnChanges {

  @Input() data: any;
  @Input() route: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['route']) {
      if (this.route != null) {
        console.log(this.route);
      }
    }
  }

}
