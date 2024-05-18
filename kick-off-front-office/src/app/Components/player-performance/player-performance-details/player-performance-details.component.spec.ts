import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPerformanceDetailsComponent } from './player-performance-details.component';

describe('PlayerPerformanceDetailsComponent', () => {
  let component: PlayerPerformanceDetailsComponent;
  let fixture: ComponentFixture<PlayerPerformanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerPerformanceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerPerformanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
