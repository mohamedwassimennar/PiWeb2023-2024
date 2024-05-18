import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessCoachComponent } from './fitness-coach.component';

describe('FitnessCoachComponent', () => {
  let component: FitnessCoachComponent;
  let fixture: ComponentFixture<FitnessCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitnessCoachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
