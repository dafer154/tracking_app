import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy, OnChanges {

  @Input() statusButton: number;
  @Output() valueStep = new EventEmitter<any>();
  @Output() statusLogin = new EventEmitter<any>();

  constructor(public $localStorage: LocalstorageService, public $authService: AuthService, private $loginService: LoginService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['statusButton']) {
    }
  }

  backStep(): void {
    this.valueStep.emit(this.statusButton -= 1);
  }

  goToLogin(): void {
    this.statusLogin.emit(true);
  }

  logOut(): void {
    this.$loginService.logOut().subscribe((res) => {
      localStorage.clear();
      this.$authService.setToken(undefined);
      console.log(res);
    }, (err) => {
      console.error(err);
    });
  }

  ngOnDestroy(): void {
    if (this.$localStorage.getStatePlatform()) {
      this.statusLogin.emit(false);
    }
  }

}
