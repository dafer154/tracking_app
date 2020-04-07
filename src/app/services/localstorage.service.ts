import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  public statePlatform: BehaviorSubject<any>;
  private statusLogut: BehaviorSubject<any>;
  private broadcastLogout: BehaviorSubject<any>;
  private loggedHome: BehaviorSubject<any>;
  private routes: BehaviorSubject<any>;

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

  public setBroadcastLogout(value: any): void {
    this.broadcastLogout = value;
  }

  public getBroadcastLogout(): BehaviorSubject<any> {
    return this.broadcastLogout;
  }

  public setLoggedHome(value: any): void {
    this.loggedHome = value;
  }

  public getLoggedHome(): BehaviorSubject<any> {
    return this.loggedHome;
  }

  public setRoutes(value: any): void {
    this.routes = value;
  }

  public getRoutes(): BehaviorSubject<any> {
    return this.routes;
  }

}
