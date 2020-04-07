import { TestBed } from '@angular/core/testing';

import { ServiceTrakingService } from './service-traking.service';

describe('ServiceTrakingService', () => {
  let service: ServiceTrakingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTrakingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
