import { TestBed } from '@angular/core/testing';

import { PreventionsService } from './preventions.service';

describe('PreventionsService', () => {
  let service: PreventionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreventionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
