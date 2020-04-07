import { Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { GoogleMapsComponent } from 'src/app/components/google-maps/google-maps.component';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { Service } from 'src/app/models/services';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ServiceTrakingService } from 'src/app/services/service-tracking/service-traking.service';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { Adress } from 'src/app/interfaces/adress.interface';
import { fadeInAnimation, fadeOutAnimation } from 'src/app/animations/animations';
import { transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-select-vehicle',
  templateUrl: './select-vehicle.component.html',
  styleUrls: ['./select-vehicle.component.scss'],
  animations: [
    trigger('myAnimationTrigger', [
      transition('* => 1', fadeInAnimation),
      transition('1 => *', fadeOutAnimation),
    ])
  ]
})

export class SelectVehicleComponent implements OnInit, DoCheck, OnChanges, OnDestroy {

  @Output() data = new EventEmitter<any>();
  @Output() dataRoute = new EventEmitter<any>();
  @Output() stepValue = new EventEmitter<any>();
  @Input() backStepValue: number;
  @ViewChild('myForm') myForm: NgForm;
  @ViewChild('mapInput') mapInput: any;
  @ViewChild(PopupComponent) popup: PopupComponent;

  @ViewChild('mapAdress') googleComponent: GoogleMapsComponent;

  private idControlAdress: number;
  private stateRemoveAdress: boolean;
  public vehicles: any[] = [];
  public select_vehicle: number = 1;
  public steps: number = 1;
  public services: Service = new Service();
  public srcImage: String = "assets/img/cars/carry.png";
  public formDimensions: FormGroup;
  public formDirections: FormGroup;
  public directions: FormArray = new FormArray([]);
  public formMerchandiseDetail: FormGroup;
  public formPricePublish: FormGroup;
  public progress: boolean;
  public success: boolean;
  public currentDate = new Date();
  public address: String;
  public selectAdress: boolean;
  public popupSettings: Object;
  public idAdress: string;
  public badge: ElementRef;
  public showMapPolylines: boolean;
  public activeRoutes: boolean;
  public dataRoutes: any;

  constructor(private fb: FormBuilder, public $authService: AuthService, private $loginService: LoginService, public $localStorage: LocalstorageService, private $VehiclesService: VehiclesService, private $trackingService: ServiceTrakingService, private rederer: Renderer2) { }

  ngOnInit(): void {
    this.popupSettings = { title: '' };
    this.progress = false;
    this.success = false;
    this.selectAdress = false;
    this.showMapPolylines = false;
    this.stateRemoveAdress = false;
    this.activeRoutes = false;
    this.address = '';
    this.idAdress = '';
    this.getAllVehicles();
    this.buildAllForms();
  }

  ngDoCheck(): void {
    if (this.steps == 1 && this.vehicles.length > 0) {
      this.changeImageVehicle(this.select_vehicle.toString());
      this.data.emit({ name: this.vehicles[this.select_vehicle - 1]['vehicles_type_name'], weight: this.vehicles[this.select_vehicle - 1]['vehicles_size'] });
      return;
    } else if (this.steps == 2 && this.vehicles.length > 0) {
      this.data.emit({ name: this.vehicles[this.select_vehicle - 1]['vehicles_type_name'], weight: this.vehicles[this.select_vehicle - 1]['vehicles_size'], height: this.formDimensions.get('height').value, width: this.formDimensions.get('width').value, long: this.formDimensions.get('long').value });
      return;
    }
    else if (this.steps == 3 && this.vehicles.length > 0) {
      this.data.emit({ name: this.vehicles[this.select_vehicle - 1]['vehicles_type_name'], weight: this.vehicles[this.select_vehicle - 1]['vehicles_size'], height: this.formDimensions.get('height').value, width: this.formDimensions.get('width').value, long: this.formDimensions.get('long').value, directions: this.services.merchandise_route.length });
      return;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['backStepValue'] && this.backStepValue != null) {
      this.steps = this.backStepValue;
      if (this.steps == 3) {
        this.showMapPolylines = false;
        this.activeRoutes = false;
      } else if (this.steps == 4) {
        this.showMapPolylines = true;
        this.activeRoutes = true;
      }
    }
  }

  getAllVehicles(): void {
    this.$VehiclesService.getAllVehicles().subscribe(res => {
      this.vehicles = res.body;
    }, err => {
      console.error(err);
    })
  }

  changeImageVehicle(imgId: string) {
    switch (imgId) {
      case '1': this.srcImage = "assets/img/cars/carry.png";
        break;
      case '2':
        this.srcImage = "assets/img/cars/turbo_mini.png";
        break;
      case '3':
        this.srcImage = "assets/img/cars/turbo_mediana.png";
        break;
      case '4':
        this.srcImage = "assets/img/cars/turbo.png";
        break;
      case '5':
        this.srcImage = "assets/img/cars/camion_sencillo.png";
        break;
      case '6':
        this.srcImage = "assets/img/cars/prueba.png";
        break;
      case '7':
        this.srcImage = "assets/img/cars/patineta.png";
        break;
      case '8':
        this.srcImage = "assets/img/cars/cuatro_manos.png";
        break;
      case '9':
        this.srcImage = "assets/img/cars/dos_torques.png";
        break;
      case '10':
        this.srcImage = "assets/img/cars/dos_torques.png";
        break;
      default: this.srcImage = "assets/img/cars/carry.png";
        break;
    }
  }

  selectSteps(steps: number) {
    switch (steps) {
      case 1:
        this.stepValue.emit(steps);
        this.steps = steps;
        break;
      case 2:
        this.stepValue.emit(steps);
        this.steps = steps;
        break;
      case 3:
        if (this.formDimensions.valid) {
          this.stepValue.emit(steps);
          this.steps = steps;
        }
        break;
      case 4:
        if (this.formDirections.valid) {
          this.stepValue.emit(steps);
          this.steps = steps;
        }
        break;
      case 5:
        this.activeRoutes = false;
        this.showMapPolylines = false;
        this.stepValue.emit(steps);
        this.steps = steps;
        break;
      case 6:
        if (this.formMerchandiseDetail.valid) {
          this.stepValue.emit(steps);
          this.steps = steps;
        }
        break;
      case 7:
        if (this.formPricePublish.valid) {
          this.stepValue.emit(steps);
          this.steps = steps;
        }
        break;
      case 8:
        if (this.$authService.isLogged()) {
          this.createService();
        } else {
          this.stepValue.emit(8);
          this.steps = 8;
        }
        break;
      case 9:
        this.stepValue.emit(steps);
        this.steps = steps;
        break;
    }
  }

  buildArrayControls(): void {
    for (var i = 0; i < 2; i++) {
      this.directions.push(
        new FormControl('', [Validators.required]),
      );
    }
  }

  buildAllForms(): void {
    this.buildArrayControls();
    this.formDimensions = this.fb.group({
      'height': ['', [Validators.required]],
      'width': ['', [Validators.required]],
      'long': ['', [Validators.required]],
    });
    this.formDirections = this.fb.group({
      address: this.directions,
    });
    this.formMerchandiseDetail = this.fb.group({
      'dateService': [new Date(), [Validators.required]],
      'valueService': ['', [Validators.required]],
      'description': ['', [Validators.required]]
    });
    this.formPricePublish = this.fb.group({
      'price': ['', [Validators.required]]
    });
  }

  requestNewService(): void {
    this.select_vehicle = 1;
    this.success = false;
    this.directions = new FormArray([]);
    this.buildAllForms();
    this.services = new Service();
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

  GFG_Fun(date: Date): string {
    return date.toISOString().split('T')[0] + ' '
      + date.toTimeString().split(' ')[0];
  }

  createService(): void {
    let service_date = new Date(this.services.merchandise_date)
    this.services.users_id = this.getUserId()
    this.services.merchandise_date = this.GFG_Fun(service_date);
    if (this.$authService.isLogged()) {
      this.progress = true;
      this.$trackingService.createService(this.services).subscribe(res => {
        this.progress = false;
        this.success = true;
        this.stepValue.emit(8);
        this.steps = 8;
        console.log(res);
      }, err => {
        this.progress = false;
        console.error(err);
      });
    }
  }

  private getUserId(): number {
    return JSON.parse(localStorage.getItem('user')).id_user;
  }

  public recalculateUbication() {
    this.googleComponent.recalculateUbication();
  }

  public getAddress($event: any) {
    this.mapInput.nativeElement.value = $event.address;
    this.mapInput.nativeElement.click();
  }

  public getPlacesAdress($event: any) {
    this.setNewAdress($event.address, $event.latLng);
  }

  setNewAdress(adress: string, route: Object) {
    var routes: Adress = {
      id: adress,
      routes: route,
      id_task: this.services.merchandise_route.length == 0 ? 1 : 2,
    };
    this.directions.controls[this.idControlAdress].setValue(adress);
    this.validationRoute(routes);
  }

  validationRoute(route: any) {
    let routeValid = this.services.merchandise_route.filter(result => result.id == route.id);
    if (routeValid != undefined && routeValid != null && routeValid.length == 0) {
      this.services.merchandise_route.splice(this.idControlAdress, route, route);
      this.directions.controls[this.idControlAdress].valueChanges.subscribe(value => {
        if (value != (this.services.merchandise_route[this.idControlAdress] != undefined && this.services.merchandise_route[this.idControlAdress]['id'])) {
          this.services.merchandise_route.splice(this.idControlAdress, 1);
        }
      });
    }
  }

  openSelectAdress(id?: any) {
    this.activeRoutes = false;
    this.idControlAdress = id;
    this.selectAdress = true;
  }

  closeSelectAdresss($event): void {
    switch ($event) {
      case 'close':
        this.selectAdress = false;
        break;
      case 'success':
        this.selectAdress = false;
        break;
    }
  }

  exitPopup() {
    this.popup.exitPopup('close');
  }

  returnIdAdress(id: number) {
    switch (id) {
      case 0: return 'A';
      case 1: return 'B';
      case 2: return this.stateRemoveAdress && this.idControlAdress == 2 ? '' : 'C';
      case 3: return this.stateRemoveAdress && this.idControlAdress == 3 ? '' : 'D';
      case 4: return this.stateRemoveAdress && this.idControlAdress == 4 ? '' : 'E';
      case 5: return this.stateRemoveAdress && this.idControlAdress == 5 ? '' : 'F';
      case 6: return this.stateRemoveAdress && this.idControlAdress == 6 ? '' : 'G';
      case 7: return this.stateRemoveAdress && this.idControlAdress == 7 ? '' : 'H';
      case 8: return this.stateRemoveAdress && this.idControlAdress == 8 ? '' : 'I';
      case 9: return this.stateRemoveAdress && this.idControlAdress == 9 ? '' : 'J';
      case 10: return this.stateRemoveAdress && this.idControlAdress == 10 ? '' : 'K';
      case 11: return this.stateRemoveAdress && this.idControlAdress == 11 ? '' : 'L';
      case 12: return this.stateRemoveAdress && this.idControlAdress == 12 ? '' : 'M';
      case 13: return this.stateRemoveAdress && this.idControlAdress == 13 ? '' : 'N';
      case 14: return this.stateRemoveAdress && this.idControlAdress == 14 ? '' : 'Ñ';
      case 15: return this.stateRemoveAdress && this.idControlAdress == 15 ? '' : 'O';
      case 16: return this.stateRemoveAdress && this.idControlAdress == 16 ? '' : 'P';
      case 17: return this.stateRemoveAdress && this.idControlAdress == 17 ? '' : 'Q';
      case 18: return this.stateRemoveAdress && this.idControlAdress == 18 ? '' : 'R';
      case 19: return this.stateRemoveAdress && this.idControlAdress == 19 ? '' : 'S';
    }
  }

  newControlAdress() {
    this.stateRemoveAdress = false;
    if (this.directions.controls.length < 20) {
      const control = new FormControl('', [Validators.required]);
      this.directions.push(control);
    }
  }

  deleteAdress(controlId: number) {
    this.idControlAdress = controlId;
    if (this.validationDeleteAdress(controlId)) {
      this.directions.removeAt(controlId);
      this.services.merchandise_route.splice(controlId, 1);
      this.stateRemoveAdress = false;
      this.activeRoutes = false;
    }
  }

  validationDeleteAdress(controlId): boolean {
    return (controlId > 1) ? true : false;
  }

  searchBadgeAndPaint(controlId: number) {
    this.idControlAdress = controlId;
    if (this.validationDeleteAdress(controlId)) {
      this.stateRemoveAdress = true;
      this.badge = this.rederer.selectRootElement(`#badge${this.idControlAdress}`, true);
      this.rederer.addClass(this.badge, 'redbadge');
      this.rederer.addClass(this.badge, 'fal');
      this.rederer.addClass(this.badge, 'fa-trash');
    }
  }

  searchBadgeAndUnPaint(controlId: number) {
    this.idControlAdress = controlId;
    if (this.validationDeleteAdress(controlId)) {
      this.stateRemoveAdress = false;
      this.badge = this.rederer.selectRootElement(`#badge${this.idControlAdress}`, true);
      this.rederer.removeClass(this.badge, 'redbadge');
      this.rederer.removeClass(this.badge, 'fal');
      this.rederer.removeClass(this.badge, 'fa-trash');
    }
  }

  confirmAdress(): void {
    if (this.formDirections.valid) {
      this.activeRoutes = true;
    }
  }

  getStatusDraw($event) {
    if ($event) {
      this.showMapPolylines = true;
      this.stepValue.emit(4);
      this.steps = 4;
    }
  }

  getDataRoute($event) {
    if ($event) {
      this.services.merchandise_distance = $event.distance;
      this.dataRoute.emit({ dataRoute: $event });
    }
  }

  ngOnDestroy(): void {
    this.success = false;
  }

}
