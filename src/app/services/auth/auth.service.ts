import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: BehaviorSubject<any>;
  private roleId: BehaviorSubject<any>;

  constructor() {
    this.setSession();
    this.isLogged();
  }

  private setSession() {
    let session = this.getTokenSaved();
    if (session) {
      this.saveToken(session);
      return;
    }
    return;
  }

  public isLogged(): BehaviorSubject<any> {
    if (this.token !== undefined) {
      return this.token;
    }
    return this.token;
  }

  public getToken(): BehaviorSubject<any> {
    return this.token;
  }

  public saveToken(token: string): void {
    localStorage.setItem('user', token);
    this.setToken(JSON.parse(token).token);
  }

  public setToken(token: any): void {
    this.token = token;
  }

  private getTokenSaved(): string {
    return localStorage.getItem('user');
  }

  public isAdmin(): BehaviorSubject<any> {
    let $localStorage = localStorage.getItem('user');
    if ($localStorage !== null && $localStorage !== undefined) {
      let dataUser = JSON.parse($localStorage);
      let admin: any = (dataUser.role === 'ADMIN') ? true : false;
      this.roleId = admin;
      return this.roleId;
    }
    return null;
  }
}
