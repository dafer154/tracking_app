import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public formLogin: FormGroup;

  @Output() closeLogin = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private $loginService: LoginService, private $authService: AuthService) { }

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin(): void {
    this.formLogin = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  closeOutLogin(): void {
    this.closeLogin.emit(false);
  }

  public signIn(): void {
    let email = this.formLogin.get('email').value;
    let password = this.formLogin.get('password').value;
    if (this.formLogin.valid) {
      this.$loginService.signIn({ email, password }).subscribe((res) => {
        console.log(res);
        this.$authService.saveToken(JSON.stringify(res));
      }, (err) => {
        console.error(err);
      });
    }
  }

  ngOnDestroy(): void {
    this.closeLogin.emit(false);
  }

}
