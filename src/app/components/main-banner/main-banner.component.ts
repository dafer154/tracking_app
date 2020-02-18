import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit {

  public task: String;

  constructor() { }

  ngOnInit(): void {
    this.task = 'Distribuir';
  }

}
