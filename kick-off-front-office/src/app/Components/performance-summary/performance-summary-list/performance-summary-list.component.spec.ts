import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceSummaryListComponent } from './performance-summary-list.component';

describe('PerformanceSummaryListComponent', () => {
  let component: PerformanceSummaryListComponent;
  let fixture: ComponentFixture<PerformanceSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceSummaryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
