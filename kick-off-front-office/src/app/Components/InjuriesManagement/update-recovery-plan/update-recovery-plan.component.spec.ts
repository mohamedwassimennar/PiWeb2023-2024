import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecoveryPlanComponent } from './update-recovery-plan.component';

describe('UpdateRecoveryPlanComponent', () => {
  let component: UpdateRecoveryPlanComponent;
  let fixture: ComponentFixture<UpdateRecoveryPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRecoveryPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRecoveryPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
