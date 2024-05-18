import { TestBed } from '@angular/core/testing';

import { TrainingCalendarService } from './training-calendar.service';

describe('TrainingCalendarService', () => {
  let service: TrainingCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
