import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceSummaryDetailsComponent } from './performance-summary-details.component';

describe('PerformanceSummaryDetailsComponent', () => {
  let component: PerformanceSummaryDetailsComponent;
  let fixture: ComponentFixture<PerformanceSummaryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceSummaryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceSummaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
