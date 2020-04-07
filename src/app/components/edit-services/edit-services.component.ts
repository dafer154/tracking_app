import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/models/services';
import { ServiceTrakingService } from 'src/app/services/service-tracking/service-traking.service';
import { PopupComponent } from 'src/app/components/popup/popup.component';

@Component({
  selector: 'app-edit-services',
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.scss']
})
export class EditServicesComponent implements OnInit {

  public popupSettings: Object;
  public formEditServices: FormGroup;
  public spinner: boolean;
  public services: Service;
  public alert: boolean;
  public typeAlert: number;
  public currentDate = new Date();

  @Output() closePopup = new EventEmitter<any>();
  @Input() servicesData: Service;
  @ViewChild(PopupComponent) popup: PopupComponent;

  constructor(private fb: FormBuilder, private $trackingService: ServiceTrakingService) { }

  ngOnInit(): void {
    this.popupSettings = {
      title: 'Editar Servicio'
    }
    this.buildFormEditService();
    this.spinner = false;
    this.services = this.servicesData;
    this.formEditServices.patchValue({
      merchandise_date: this.services.merchandise_date
    });
  }

  close($event) {
    this.closePopup.emit($event);
  }

  buildFormEditService(): void {
    this.formEditServices = this.fb.group({
      'merchandise_height': ['', Validators.required],
      'merchandise_width': ['', Validators.required],
      'merchandise_long': ['', Validators.required],
      'merchandise_date': ['', [Validators.required]],
      'merchandise_description': ['', [Validators.required]],
      'merchandise_value': ['', [Validators.required]],
      'merchandise_price': ['', Validators.required],
      'merchandise_status': ['', Validators.required],
      'vehicles_id': ['', Validators.required],
      'merchandise_address_carge': ['', Validators.required],
      'merchandise_address_uncarge': ['', Validators.required],
    });
  }

  GFG_Fun(date: Date): string {
    return date.toISOString().split('T')[0] + ' '
      + date.toTimeString().split(' ')[0];
  }


  updateService(): void {
    if (this.formEditServices.valid) {
      this.services.merchandise_id = this.servicesData.merchandise_id;
      let service_date = new Date(this.formEditServices.get('merchandise_date').value);
      this.services.users_id = this.getUserId()
      this.services.merchandise_date = this.GFG_Fun(service_date);
      this.spinner = true;
      this.$trackingService.updateService(this.services).subscribe((res) => {
        this.successFunction(3);
        console.log(res);
      }, (err) => {
        this.successFunction(1);
        console.error(err);
      })
    }
  }

  successFunction(typeAlert: number) {
    this.typeAlert = typeAlert;
    this.alert = true;
    this.spinner = false;
  }

  getAlertData($event) {
    if ($event) {
      if (this.typeAlert == 3) {
        setTimeout(() => { this.alert = false; this.popup.exitPopup('success'); }, 250);
      } else {
        setTimeout(() => { this.alert = false; }, 250);
      }
    }
  }

  private getUserId(): number {
    return JSON.parse(localStorage.getItem('user')).id_user;
  }

}
