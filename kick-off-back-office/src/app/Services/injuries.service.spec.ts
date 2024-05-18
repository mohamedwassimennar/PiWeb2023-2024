import { TestBed } from '@angular/core/testing';

import { InjuriesService } from './injuries.service';

describe('InjuriesService', () => {
  let service: InjuriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InjuriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
