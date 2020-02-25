import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-dashboard',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponentDashboard implements OnInit {

  test : Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
