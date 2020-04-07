import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from 'src/constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  createNaturalUser(users: any): Observable<any> {
    return this.http.post(Users.CREATENATURAL, users).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

  createJuridicalUser(users: any): Observable<any> {
    return this.http.post(Users.CREATEJURIDICAL, users).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

  createTransporterUser(users: any): Observable<any> {
    return this.http.post(Users.CREATETRANSPORTER, users).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

  getUserByEmail(email: any): Observable<any> {
    return this.http.get(Users.VALIDATEEMAIL + email, { observe: 'response' }).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

  getUserByPhoneNumber(phone_number: any): Observable<any> {
    return this.http.get(Users.VALIDATEPHONE + phone_number, { observe: 'response' }).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

  getUserAll(): Observable<any> {
    return this.http.get(Users.GETALL, { observe: 'response', headers: new HttpHeaders({ 'token': this.getUserToken() }) }).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

  private getUserToken(): string {
    return JSON.parse(localStorage.getItem('user')).token;
  }

}
