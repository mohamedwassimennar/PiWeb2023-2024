import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantCoachComponent } from './assistant-coach.component';

describe('AssistantCoachComponent', () => {
  let component: AssistantCoachComponent;
  let fixture: ComponentFixture<AssistantCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantCoachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
