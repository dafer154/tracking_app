import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public juridical: boolean;
  public natural: boolean;

  constructor() { }

  ngOnInit(): void {
    this.juridical = false;
    this.natural = false;
  }

}
