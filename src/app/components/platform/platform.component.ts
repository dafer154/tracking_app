import { Component, OnInit, OnDestroy, DoCheck, AfterViewChecked } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})

export class PlatformComponent implements OnInit, OnDestroy, DoCheck, AfterViewChecked {

  public data: any;
  public dataRoute: any;
  public widthPercent: number = 12.5;
  public valueBStepPostive: number;
  public valueBStepNegative: number;
  public login: boolean;
  public alert: boolean;
  public typeAlert: number;

  constructor(private $localStorage: LocalstorageService, public $authService: AuthService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.login = false;
    this.alert = false;
    this.$localStorage.setStatePlatform(true);
    if (this.$localStorage.getLoggedHome()) {
      this.successFunction(3);
      this.$localStorage.setLoggedHome(false);
    }
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.$localStorage.setStatePlatform(false);
    this.$localStorage.setBroadcastLogout(false);
  }

  ngDoCheck(): void {
    if (this.$localStorage.getBroadcastLogout()) {
      this.successFunction(3);
      // return;
    }
    if (this.$localStorage.getStatusLogut()) {
      this.destroyComponent();
      return;
    }
  }

  getDataRoute($event) {
    if ($event) {
      this.dataRoute = $event;
      console.log(this.dataRoute);
    }

  }

  vehicleData($event: any) {
    this.data = $event;
  }

  getStatusLogin($event: any) {
    this.login = $event;
  }

  closeLogin($event) {
    this.login = $event;
    if (!this.login && this.valueBStepPostive == 8 && !this.$authService.isLogged()) {
      this.valueBStepNegative = 7;
      this.valueBStepPostive = 7;
    } else {
      if (this.$authService.isLogged() && this.valueBStepPostive == 8) {
        this.valueBStepPostive = 8;
        this.valueBStepNegative = 8;
      } else if (this.$authService.isLogged() && !this.login) {
        this.successFunction(3);
      }
    }
  }

  getValueStep($event: any) {
    this.valueBStepNegative = $event;
    this.valueBStepPostive = $event;
    switch ($event) {
      case 1: this.widthPercent = 12.5;
        break;
      case 2: this.widthPercent -= 12.5;
        break;
      case 3: this.widthPercent -= 12.5;
        break;
      case 4: this.widthPercent -= 12.5;
        break;
      case 5: this.widthPercent -= 12.5;
        break;
      case 6: this.widthPercent -= 12.5;
        break;
      case 7: this.widthPercent -= 12.5;
        break;
      case 8: this.widthPercent -= 12.5;
        break;
      case 9: this.widthPercent -= 12.5;
        break;
    }
  }

  stepsValue($event: any) {
    this.valueBStepPostive = $event;
    this.valueBStepNegative = $event;
    switch ($event) {
      case 1: this.widthPercent = 12.5;
        break;
      case 2: this.widthPercent += 12.5;
        break;
      case 3: this.widthPercent += 12.5;
        break;
      case 4: this.widthPercent += 12.5;
        break;
      case 5: this.widthPercent += 12.5;
        break;
      case 6: this.widthPercent += 12.5;
        break;
      case 7: this.widthPercent += 12.5;
        break;
      case 8:
        if (this.$authService.isLogged()) {
          this.widthPercent += 12.5;
        } else {
          this.login = true;
        }
        break;
      case 9: this.widthPercent += 12.5;
        break;
    }
  }

  destroyComponent(): void {
    this.widthPercent = 12.5;
    this.valueBStepNegative = 1;
    this.valueBStepPostive = 1;
    this.$localStorage.setStatusLogut(false);
  }

  successFunction(typeAlert: number) {
    this.typeAlert = typeAlert;
    this.alert = true;
  }

  getAlertData($event) {
    if ($event) {
      setTimeout(() => { this.alert = false; this.$localStorage.setBroadcastLogout(false); }, 250);
    }
  }


}
