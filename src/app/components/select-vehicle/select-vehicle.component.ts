import { Component, OnInit, DoCheck, EventEmitter, Output, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/login/login.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-select-vehicle',
  templateUrl: './select-vehicle.component.html',
  styleUrls: ['./select-vehicle.component.scss']
})
export class SelectVehicleComponent implements OnInit, DoCheck, OnChanges {


  @Output() data = new EventEmitter<any>();
  @Output() stepValue = new EventEmitter<any>();
  @Input() backStepValue: number;
  @ViewChild('myForm') myForm: NgForm;
  public vehicles: any[] = [];
  public select_vehicle: number = 1;
  public steps: number = 1;
  public srcImage = "https://app.quick.com.co/assets/img/image-carry.jpg";
  public formDimensions: FormGroup = new FormGroup({
    height: new FormControl('', [Validators.required]),
    width: new FormControl('', [Validators.required]),
    long: new FormControl('', [Validators.required]),
  });

  constructor(public $authService: AuthService, private $loginService: LoginService, private $localStorage: LocalstorageService) { }

  ngOnInit(): void {
    this.vehicles.push(
      { id: 1, name: 'CAMIONETA CARRY', weight: '100kg-850kg' },
      { id: 2, name: 'VEHÍCULO TURBO MINI', weight: '850kg-1500kg' },
      { id: 3, name: 'VEHÍCULO TURBO MEDIANA', weight: '1500kg-2500kg' },
      { id: 4, name: 'VEHÍCULO TURBO', weight: '2500kg-4500kg' },
      { id: 5, name: 'CAMIÓN SENCILLO', weight: '4500kg-8500kg' },
      { id: 6, name: 'DOBLE TROQUE', weight: '8500kg-17000kg' },
      { id: 7, name: 'PATINETA', weight: '17000kg-20000kg' },
      { id: 8, name: 'CUATRO MANOS', weight: '20000kg-22000kg' },
      { id: 9, name: 'TRACTOMULA 2 TROQUES', weight: '22000kg-32000kg' },
      { id: 10, name: 'TRACTOMULA 3 TROQUES', weight: '32000kg-35000kg' },
    );
  }

  ngDoCheck(): void {
    if (this.steps == 1) {
      this.changeImageVehicle(this.select_vehicle.toString());
      this.data.emit({ name: this.vehicles[this.select_vehicle - 1]['name'], weight: this.vehicles[this.select_vehicle - 1]['weight'] });
      return;
    } else if (this.steps == 2) {
      this.data.emit({ name: this.vehicles[this.select_vehicle - 1]['name'], weight: this.vehicles[this.select_vehicle - 1]['weight'], height: this.formDimensions.get('height').value, width: this.formDimensions.get('width').value, long: this.formDimensions.get('long').value });
      return;
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['backStepValue'] && this.backStepValue != null) {
      this.steps = this.backStepValue;
    }
  }

  changeImageVehicle(imgId: string) {
    switch (imgId) {
      case '1': this.srcImage = "https://app.quick.com.co/assets/img/image-carry.jpg";
        break;
      case '2':
        this.srcImage = "https://app.quick.com.co/assets/img/image-nhr.jpg";
        break;
      case '3':
        this.srcImage = "https://app.quick.com.co/assets/img/image-nkr.jpg";
        break;
      case '4':
        this.srcImage = "https://app.quick.com.co/assets/img/image-npr.jpg";
        break;
      case '5':
        this.srcImage = "https://app.quick.com.co/assets/img/image-simple.jpg";
        break;
      case '6':
        this.srcImage = "https://app.quick.com.co/assets/img/image-double.jpg";
        break;
      case '7':
        this.srcImage = "https://app.quick.com.co/assets/img/image-simple.jpg";
        break;
      case '8':
        this.srcImage = "https://app.quick.com.co/assets/img/image-carry.jpg";
        break;
      case '9':
        this.srcImage = "https://app.quick.com.co/assets/img/image-truck-double.jpg";
        break;
      case '10':
        this.srcImage = "https://app.quick.com.co/assets/img/image-truck-triple.jpg";
        break;
      default: this.srcImage = "https://app.quick.com.co/assets/img/image-carry.jpg";
        break;
    }
  }

  selectSteps(steps: number) {
    this.stepValue.emit(steps);
    this.steps = steps;
  }

  requestNewService(): void {
    this.$localStorage.setStatusLogut(true);
  }

  logOut(): void {
    this.$loginService.logOut().subscribe((res) => {
      localStorage.clear();
      this.$authService.setToken(undefined);
      console.log(res);
    }, (err) => {
      console.error(err);
    });
  }
}
