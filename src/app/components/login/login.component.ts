import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { fadeInAnimation, fadeOutAnimation } from 'src/app/animations/animations';
import { transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('myAnimationTrigger', [
      transition('* => 1', fadeInAnimation),
      transition('1 => *', fadeOutAnimation),
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  public formLogin: FormGroup;
  public showPassword: boolean;
  public alert: boolean;
  public typeAlert: number;

  @Output() closeLogin = new EventEmitter<any>();
  @Input() animation: any;

  constructor(private fb: FormBuilder, private $loginService: LoginService, private $authService: AuthService, private router: Router, private $localStorage: LocalstorageService, ) { }

  ngOnInit(): void {
    this.initFormLogin();
    this.showPassword = true;
    this.alert = false;
  }

  initFormLogin(): void {
    this.formLogin = this.fb.group({
      'email': ['', [Validators.required]],
      'password': ['', Validators.required]
    });
  }

  closeOutLogin(): void {
    this.animation = '*';
    setTimeout(() => {
      this.closeLogin.emit(false);
    }, 250)
  }

  public signIn(): void {
    let email = this.formLogin.get('email').value;
    let password = this.formLogin.get('password').value;
    if (this.formLogin.valid) {
      this.$loginService.signIn({ email, password }).subscribe((res) => {
        console.log(res);
        this.$authService.saveToken(JSON.stringify(res));
        this.closeOutLogin();
        this.redirectCondition();
      }, (err) => {
        console.error(err);
        this.successFunction(6);
      });
    }
  }

  redirectCondition(): void {
    if (this.router.url == '/home') {
      this.$localStorage.setLoggedHome(true);
      this.router.navigate(['/platform']);
    }
  }

  ngOnDestroy(): void {
    this.closeLogin.emit(false);
  }

  successFunction(typeAlert: number) {
    this.typeAlert = typeAlert;
    this.alert = true;
  }

  getAlertData($event) {
    if ($event) {
      setTimeout(() => { this.alert = false; }, 250);
    }
  }

}
