import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleInternshipsComponent } from './schedule-internships.component';

describe('ScheduleInternshipsComponent', () => {
  let component: ScheduleInternshipsComponent;
  let fixture: ComponentFixture<ScheduleInternshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleInternshipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleInternshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
