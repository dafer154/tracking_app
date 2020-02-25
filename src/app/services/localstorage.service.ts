import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  public statePlatform: BehaviorSubject<any>;
  private statusLogut: BehaviorSubject<any>;

  constructor() { }

  public setStatePlatform(value: any): void {
    this.statePlatform = value;
  }

  public getStatePlatform(): BehaviorSubject<any> {
    return this.statePlatform;
  }

  public setStatusLogut(value: any): void {
    this.statusLogut = value;
  } 

  public getStatusLogut(): BehaviorSubject<any> {
    return this.statusLogut;
  } 
}
