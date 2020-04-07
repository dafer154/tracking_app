import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cities } from 'src/constants/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CitiesService {

  constructor(private http: HttpClient) { }

  getAllCities(): Observable<any> {
    return this.http.get(Cities.GETALL, { observe: 'response' }).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      }),
    );
  }
}
