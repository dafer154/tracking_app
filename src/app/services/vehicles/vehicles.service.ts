import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehicles } from 'src/constants/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http: HttpClient) { }

  getAllVehicles(): Observable<any> {
    return this.http.get(Vehicles.GETALL, { observe: 'response' }).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      }),
    );
  }

}
