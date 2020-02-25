import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit, OnDestroy, DoCheck {

  public data: any;
  public widthPercent: number = 12.5;
  public valueBStepPostive: number;
  public valueBStepNegative: number;
  public login: boolean;

  constructor(private $localStorage: LocalstorageService, public $authService: AuthService) { }

  ngOnInit(): void {
    this.login = false;
    this.$localStorage.setStatePlatform(true);
  }

  ngOnDestroy(): void {
    this.$localStorage.setStatePlatform(false);
  }

  ngDoCheck(): void {
    if (this.$localStorage.getStatusLogut()) {
      this.destroyComponent();
      return;
    }
  }

  vehicleData($event: any) {
    this.data = $event;
  }

  getSattusLogin($event: any) {
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
        this.widthPercent += 12.5;
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


}
