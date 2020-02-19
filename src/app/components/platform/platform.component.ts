import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit, OnDestroy {

  public data: any;
  public widthPercent: number = 12.5;

  constructor(private $localStorage: LocalstorageService) { }

  ngOnInit(): void {
    this.$localStorage.setStatePlatform(true);
  }

  ngOnDestroy(): void {
    this.$localStorage.setStatePlatform(false);
  }

  vehicleData($event: any) {
    this.data = $event;
  }

  stepsValue($event: any) {
    switch($event) {
      case 1 : this.widthPercent = 12.5;
      break;
      case 2 : this.widthPercent += 12.5;
      break;
      case 3 : this.widthPercent += 12.5;
      break;
      case 4 : this.widthPercent += 12.5;
      break;
      case 5 : this.widthPercent += 12.5;
      break;
      case 6 : this.widthPercent += 12.5;
      break;
      case 7 : this.widthPercent += 12.5;
      break;
      case 8 : this.widthPercent += 12.5;
      break;
      case 9 : this.widthPercent += 12.5;
      break;
    }
  }



}
