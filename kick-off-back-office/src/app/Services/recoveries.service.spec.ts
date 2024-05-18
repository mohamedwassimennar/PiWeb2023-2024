import { TestBed } from '@angular/core/testing';

import { RecoveriesService } from './recoveries.service';

describe('RecoveriesService', () => {
  let service: RecoveriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoveriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
