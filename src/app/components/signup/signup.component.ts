import { Component, OnInit, HostListener } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CitiesService } from 'src/app/services/cities/cities.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public juridical: boolean;
  public natural: boolean;
  private payloadUser: {} = {};
  public formNatural: FormGroup;
  public formJuridical: FormGroup;
  public cities: any[] = [];
  public showPassword: boolean;
  public spinner: boolean;
  public alert: boolean;
  public typeAlert: number;
  constructor(private $userService: UsersService, private fb: FormBuilder, private router: Router, private $citiesService: CitiesService) {
  }

  ngOnInit(): void {
    this.buildFormNatural();
    this.buildFormJuridical();
    this.getAllCities();
    this.juridical = false;
    this.natural = false;
    this.showPassword = true;
    this.spinner = false;
    this.alert = false;
  }

  createUser(): void {
    this.buildPayload();
    if (this.natural && this.formNatural.valid) {
      this.spinner = true;
      this.$userService.createNaturalUser(this.payloadUser).subscribe(
        res => {
          console.log(res);
          this.successFunction(3);
        }, err => {
          console.error(err);
          this.successFunction(1);
        }
      );
    } else {
      if (this.juridical && this.formJuridical.valid) {
        this.spinner = true;
        this.$userService.createJuridicalUser(this.payloadUser).subscribe(
          res => {
            console.log(res);
            this.successFunction(3);
          }, err => {
            console.error(err);
            this.successFunction(1);
          }
        );
      }
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
        setTimeout(() => { this.alert = false; this.router.navigate(['/platform']); }, 250);
      } else {
        setTimeout(() => { this.alert = false; }, 250);
      }
    }
  }

  buildFormNatural(): void {
    this.formNatural = this.fb.group({
      'name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'nit': ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      'email': ['', [Validators.required, Validators.email]],
      'phone_number': ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      'password': ['', Validators.required],
      'type_document': ['', Validators.required],
      'terms_and_conditions': ['', Validators.required],
    });
  }

  buildFormJuridical(): void {
    this.formJuridical = this.fb.group({
      'company_name': ['', Validators.required],
      'loyal_name_company': ['', Validators.required],
      'name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'nit': ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      'email': ['', [Validators.required, Validators.email]],
      'phone_number': ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      'password': ['', Validators.required],
      'address': ['', Validators.required],
      "address_payments": ['', Validators.required],
      'cities_id': ['', Validators.required],
      'terms_and_conditions': ['', Validators.required],
      'position': ['', Validators.required]
    });
  }

  buildPayload(): void {
    let json: any[] = [];
    if (this.natural) {
      Object.keys(this.formNatural.controls).forEach(field => {
        const keys: any = field;
        const value: any = this.formNatural.get(field).value;
        json.push({ [keys]: value });
      });
      this.payloadUser = JSON.parse(this.getToJsonDetails(json));
    } else {
      Object.keys(this.formJuridical.controls).forEach(field => {
        const keys: any = field;
        const value: any = this.formJuridical.get(field).value;
        json.push({ [keys]: value });
      });
      this.payloadUser = JSON.parse(this.getToJsonDetails(json));
    }
  }

  getToJsonDetails(json: any[] = []): string {
    let item = JSON.stringify(json);
    let itemreplace = item.replace(/{/g, '').replace(/}/g, '').replace('[', '').replace(']', '');
    return '{' + itemreplace + '}';
  }

  getAllCities(): void {
    this.$citiesService.getAllCities().subscribe(res => {
      this.cities = res.body;
      console.log(res.body);
    }, err => {
      console.error(err);
    })
  }

  changeForm(): void {
    this.natural = false;
    this.juridical = true;
  }
}
