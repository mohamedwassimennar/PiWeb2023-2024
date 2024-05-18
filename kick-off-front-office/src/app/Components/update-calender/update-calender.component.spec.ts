import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCalenderComponent } from './update-calender.component';

describe('UpdateCalenderComponent', () => {
  let component: UpdateCalenderComponent;
  let fixture: ComponentFixture<UpdateCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
