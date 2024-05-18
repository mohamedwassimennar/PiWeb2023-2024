import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddleagueComponent } from './addleague.component';

describe('AddleagueComponent', () => {
  let component: AddleagueComponent;
  let fixture: ComponentFixture<AddleagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddleagueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddleagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
