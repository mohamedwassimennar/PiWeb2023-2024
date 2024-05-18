import { TestBed } from '@angular/core/testing';

import { PlayerscoutedService } from './playerscouted.service';

describe('PlayerscoutedService', () => {
  let service: PlayerscoutedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerscoutedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
