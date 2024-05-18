import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceSummaryCreateComponent } from './performance-summary-create.component';

describe('PerformanceSummaryCreateComponent', () => {
  let component: PerformanceSummaryCreateComponent;
  let fixture: ComponentFixture<PerformanceSummaryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceSummaryCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceSummaryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
