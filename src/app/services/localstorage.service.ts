import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  public statePlatform: BehaviorSubject<any>;

  constructor() { }

  public setStatePlatform(value: any) {
    this.statePlatform = value;
  }

  public getStatePlatform() {
    return this.statePlatform;
  }
}
