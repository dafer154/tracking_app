import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit, OnDestroy {

  public data: any;

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



}
