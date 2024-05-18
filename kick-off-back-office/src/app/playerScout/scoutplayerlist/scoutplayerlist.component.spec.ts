import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutplayerlistComponent } from './scoutplayerlist.component';

describe('ScoutplayerlistComponent', () => {
  let component: ScoutplayerlistComponent;
  let fixture: ComponentFixture<ScoutplayerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoutplayerlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoutplayerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
