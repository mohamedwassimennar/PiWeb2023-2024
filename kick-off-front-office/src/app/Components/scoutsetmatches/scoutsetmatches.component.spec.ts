import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutsetmatchesComponent } from './scoutsetmatches.component';

describe('ScoutsetmatchesComponent', () => {
  let component: ScoutsetmatchesComponent;
  let fixture: ComponentFixture<ScoutsetmatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoutsetmatchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoutsetmatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
