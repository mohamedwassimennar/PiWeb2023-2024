import { TestBed } from '@angular/core/testing';

import { DataServiceAiService } from './data-service-ai.service';

describe('DataServiceAiService', () => {
  let service: DataServiceAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataServiceAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
