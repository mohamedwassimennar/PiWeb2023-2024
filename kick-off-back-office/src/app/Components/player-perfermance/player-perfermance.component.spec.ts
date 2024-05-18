import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPerfermanceComponent } from './player-perfermance.component';

describe('PlayerPerfermanceComponent', () => {
  let component: PlayerPerfermanceComponent;
  let fixture: ComponentFixture<PlayerPerfermanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerPerfermanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerPerfermanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
