import { Adress } from 'src/app/interfaces/adress.interface';

export class Service {
  public merchandise_id: any;
  public merchandise_height: any;
  public merchandise_width: any;
  public merchandise_long: any;
  public merchandise_route: Adress[] = [];
  public merchandise_date: any = new Date();
  public merchandise_description: any;
  public merchandise_value: any;
  public merchandise_price: any;
  public merchandise_status: any;
  public merchandise_distance: any;
  public vehicles_id: any = 1;
  public merchandise_address_carge: any;
  public merchandise_address_uncarge: any;
  public merchandise_address_mix: any;
  public users_id: any;
  public task_id: any;
}
