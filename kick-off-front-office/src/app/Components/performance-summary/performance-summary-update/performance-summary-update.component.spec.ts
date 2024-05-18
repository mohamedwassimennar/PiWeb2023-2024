import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceSummaryUpdateComponent } from './performance-summary-update.component';

describe('PerformanceSummaryUpdateComponent', () => {
  let component: PerformanceSummaryUpdateComponent;
  let fixture: ComponentFixture<PerformanceSummaryUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceSummaryUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceSummaryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
