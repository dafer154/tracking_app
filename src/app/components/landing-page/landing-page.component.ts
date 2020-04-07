import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public items = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' },
  ]
  public login: boolean;

  constructor(public router: Router, private $localStorage: LocalstorageService) { }

  ngOnInit(): void {
    this.login = false;
  }

  getStatusLogin($event: any): void {
    this.login = $event;
  }

  closeLogin($event): void {
    this.login = $event;
  }

}
