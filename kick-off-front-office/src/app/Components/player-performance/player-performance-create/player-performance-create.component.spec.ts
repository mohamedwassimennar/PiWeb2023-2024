import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPerformanceCreateComponent } from './player-performance-create.component';

describe('PlayerPerformanceCreateComponent', () => {
  let component: PlayerPerformanceCreateComponent;
  let fixture: ComponentFixture<PlayerPerformanceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerPerformanceCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerPerformanceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
