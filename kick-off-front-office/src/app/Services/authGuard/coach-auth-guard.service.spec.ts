import { TestBed } from '@angular/core/testing';

import { CoachAuthGuardService } from './coach-auth-guard.service';

describe('CoachAuthGuardService', () => {
  let service: CoachAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
