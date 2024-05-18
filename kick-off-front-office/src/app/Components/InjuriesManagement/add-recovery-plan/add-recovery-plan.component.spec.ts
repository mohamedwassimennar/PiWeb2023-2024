import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecoveryPlanComponent } from './add-recovery-plan.component';

describe('AddRecoveryPlanComponent', () => {
  let component: AddRecoveryPlanComponent;
  let fixture: ComponentFixture<AddRecoveryPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecoveryPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecoveryPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
