import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPerformanceListComponent } from './player-performance-list.component';

describe('PlayerPerformanceListComponent', () => {
  let component: PlayerPerformanceListComponent;
  let fixture: ComponentFixture<PlayerPerformanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerPerformanceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerPerformanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
