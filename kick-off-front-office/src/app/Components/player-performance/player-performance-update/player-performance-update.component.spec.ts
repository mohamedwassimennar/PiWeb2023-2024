import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPerformanceUpdateComponent } from './player-performance-update.component';

describe('PlayerPerformanceUpdateComponent', () => {
  let component: PlayerPerformanceUpdateComponent;
  let fixture: ComponentFixture<PlayerPerformanceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerPerformanceUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerPerformanceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
