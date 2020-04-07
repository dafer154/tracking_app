import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit } from '@angular/core';
import { animationBottomTraslateYAlert, animationTopTraslateYAlert, animationOpacitiZero, animationOpacitiOne } from 'src/app/animations/animations';
import { transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-alerts-dashboard',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  animations: [
    trigger('myAnimationTrigger', [
      transition('1 => *', animationBottomTraslateYAlert),
      transition('* => 1', animationTopTraslateYAlert),
    ]),
    trigger('myAnimationTriggerOpacity', [
      transition('1 => *', animationOpacitiZero),
      transition('* => 1', animationOpacitiOne),
    ]),
  ]
})

export class AlertsComponentDashboard implements OnInit, AfterViewInit {

  @Output() exit = new EventEmitter<string>();
  @Input() typeAlert: any;
  public state: number = 0;
  public visible: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.state = 1;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.visible = true;
      this.exitPopup();
    }, 350);
  }

  exitPopup() {
    setTimeout(() => {
      this.exit.emit('exit');
      this.state = 0;
    }, 3500);
  }

}
