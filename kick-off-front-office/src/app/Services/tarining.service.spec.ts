import { TestBed } from '@angular/core/testing';

import {TariningService} from './tarining.service';

describe('TariningService', () => {
  let service: TariningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TariningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
