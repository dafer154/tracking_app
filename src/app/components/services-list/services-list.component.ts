import { Component, OnInit } from '@angular/core';
import { ServiceTrakingService } from 'src/app/services/service-tracking/service-traking.service';
import { Service } from 'src/app/models/services';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {

  public services: Array<Service> = [];
  public activeServices: Array<Service> = [];
  public approveServices: Array<Service> = [];
  public onRouteServices: Array<Service> = [];
  public editService: boolean;
  public dataService: Service;
  private typeQuery: string = '';

  constructor(private $servicesTracking: ServiceTrakingService, public $authService: AuthService) { }

  ngOnInit(): void {
    if (this.$authService.isAdmin()) {
      this.switchQuery('history');
    } else {
      this.switchQuery('approve', this.getUserId());
    }
    this.editService = false;
  }

  getAllServices(status: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.$servicesTracking.getAllServices(status).subscribe(res => {
        var services = res.body;
        services.forEach(async (service) => {
          service['merchandise_route'] = await this.getAdressService(service.merchandise_id);
          if (service['merchandise_route'].length > 0) {
            service.merchandise_address_carge = service.merchandise_route[0].adress;
            service.merchandise_address_uncarge = service.merchandise_route[service.merchandise_route.length - 1].adress;
          }
        });

        resolve(services);
      }, err => {
        console.error(err);
      });
    });
  }

  getAllServicesByStatus(users_id: any, status: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.$servicesTracking.getAllServicesByStatus(users_id, status).subscribe(res => {
        var services = res.body;
        services.forEach(async (service) => {
          service.merchandise_route = await this.getAdressService(service.merchandise_id);
          if (service['merchandise_route'].length > 0) {
            service.merchandise_address_carge = service.merchandise_route[0].adress;
            service.merchandise_address_uncarge = service.merchandise_route[service.merchandise_route.length - 1].adress;
          }
        });
        console.log(services, 'NUEVOOOOO')
        resolve(services);
      }, err => {
        console.error(err);
      });
    });
  }

  getAdressService(merchandise_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.$servicesTracking.getAdressService(merchandise_id).subscribe(res => {
        resolve(res.body);
      }, err => {
        console.error(err);
        reject(err);
      });
    });

  }

  async switchQuery(type: string, user?: any) {
    if (!this.$authService.isAdmin()) { user = this.getUserId() }
    this.typeQuery = type;
    switch (type) {
      case 'history':
        this.services = user ? await this.getAllServicesByStatus(user, 'HISTORICOS') : await this.getAllServices('HISTORICOS');
        break;
      case 'actives':
        this.activeServices = user ? await this.getAllServicesByStatus(user, 'ACTIVOS') : await this.getAllServices('ACTIVOS');
        break;
      case 'approve':
        this.approveServices = user ? await this.getAllServicesByStatus(user, 'APROBADOS') : await this.getAllServices('APROBADOS');
        break;
      case 'onroute':
        this.onRouteServices = user ? await this.getAllServicesByStatus(user, 'EN RUTA') : await this.getAllServices('EN RUTA');
        break;
    }

  }

  private getUserId(): number {
    return JSON.parse(localStorage.getItem('user')).id_user;
  }

  parseDate(date: string) {
    return new Date(date);
  }

  public subStringCustom(title, num): string {
    if (title.length >= num) {
      return title.substring(0, num) + '...';
    }
    if (title.length < num) {
      return title.substring(0, num);
    }
  }

  public editServices(item: any) {
    if (this.$authService.isAdmin()) {
      console.log(item, 'INDEX OF TABLE');
      this.dataService = item;
      this.editService = true;
    }
  }

  closeEditService($event): void {
    switch ($event) {
      case 'close':
        this.editService = false;
        break;
      case 'success':
        this.editService = false;
        this.switchQuery(this.typeQuery, this.getUserId());
        break;
    }
  }

}
