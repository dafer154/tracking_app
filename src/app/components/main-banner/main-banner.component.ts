import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit {

  public task: String;

  constructor(public router: Router, private $localStorage: LocalstorageService) { }

  ngOnInit(): void {
    this.task = 'Distribuir';
  }

  goToPlatform(): void {
    this.$localStorage.setStatePlatform(true);
    this.router.navigate(['/platform']);
  }

}
