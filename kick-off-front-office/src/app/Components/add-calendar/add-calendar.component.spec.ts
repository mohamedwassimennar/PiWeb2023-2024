import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalendarComponent } from './add-calendar.component';

describe('AddCalendarComponent', () => {
  let component: AddCalendarComponent;
  let fixture: ComponentFixture<AddCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
