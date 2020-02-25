import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Login } from 'src/constants/constants';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private $localStorage: LocalstorageService) { }

  signIn(payload: { email, password }): Observable<any> {
    return this.http.post(Login.AUTH, payload).pipe(
      map((res) => {
        return res;
      }, (err) => {
        return err;
      })
    );
  }

  logOut(): Observable<any> {
    const HttpOptions = {
      headers: new HttpHeaders({ 'token': this.getUserToken() })
    }
    return this.http.post(Login.LOGOUT, { id_user: this.getUserId() }, HttpOptions).pipe(
      map((res) => {
        this.$localStorage.setStatusLogut(true);
        return res;
      }, (err) => {
        return err;
      })
    );
  }

  private getUserId(): string {
    return JSON.parse(localStorage.getItem('user')).id_user;
  }

  private getUserToken(): string {
    return JSON.parse(localStorage.getItem('user')).token;
  }
}
