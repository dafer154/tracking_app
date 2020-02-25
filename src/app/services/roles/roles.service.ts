import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Roles } from 'src/constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RolesService {

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<any> {
    return this.http.get(Roles.GETALL, { observe: 'response', headers: new HttpHeaders().set('Content-Type', 'application/json') }).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      }),
    );
  }
}
