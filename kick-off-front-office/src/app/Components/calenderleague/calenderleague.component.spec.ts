import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderleagueComponent } from './calenderleague.component';

describe('CalenderleagueComponent', () => {
  let component: CalenderleagueComponent;
  let fixture: ComponentFixture<CalenderleagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderleagueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalenderleagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
