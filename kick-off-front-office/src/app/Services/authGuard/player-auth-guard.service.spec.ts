import { TestBed } from '@angular/core/testing';

import { PlayerAuthGuardService } from './player-auth-guard.service';

describe('PlayerAuthGuardService', () => {
  let service: PlayerAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
