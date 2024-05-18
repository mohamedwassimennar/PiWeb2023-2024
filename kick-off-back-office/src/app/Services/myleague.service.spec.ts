import { TestBed } from '@angular/core/testing';

import { MyleagueService } from './myleague.service';

describe('MyleagueService', () => {
  let service: MyleagueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyleagueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
