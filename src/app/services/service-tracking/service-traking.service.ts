import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Service } from 'src/constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceTrakingService {

  constructor(private http: HttpClient) { }

  createService(merchandise: any): Observable<any> {
    const HttpOptions = {
      headers: new HttpHeaders({ 'token': this.getUserToken() })
    }
    return this.http.post(Service.CREATE, merchandise, HttpOptions).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

  updateService(merchandise: any): Observable<any> {
    const HttpOptions = {
      headers: new HttpHeaders({ 'token': this.getUserToken() })
    }
    return this.http.put(Service.UPDATE, merchandise, HttpOptions).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

  getAllServices(status: string): Observable<any> {
    return this.http.get(Service.GETALL + status, { observe: 'response', headers: new HttpHeaders({ 'token': this.getUserToken() }) }).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

  getAllServicesByStatus(users_id: number, status: string): Observable<any> {
    return this.http.get(Service.GETALLACTIVE + users_id + '/' + status, { observe: 'response', headers: new HttpHeaders({ 'token': this.getUserToken() }) }).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

  getAdressService(merchandise_id: number): Observable<any> {
    return this.http.get(Service.GETADRESS + merchandise_id, { observe: 'response', headers: new HttpHeaders({ 'token': this.getUserToken() }) }).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

  getServiceById(id: any): Observable<any> {
    return this.http.get(Service.GETBYID + id, { observe: 'response', headers: new HttpHeaders({ 'token': this.getUserToken() }) }).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

  deleteService(id: any): Observable<any> {
    return this.http.delete(Service.DELETE + id, { observe: 'response', headers: new HttpHeaders({ 'token': this.getUserToken() }) }).pipe(
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
