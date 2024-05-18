import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfootballComponent } from './newsfootball.component';

describe('NewsfootballComponent', () => {
  let component: NewsfootballComponent;
  let fixture: ComponentFixture<NewsfootballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsfootballComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsfootballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
