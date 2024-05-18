import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyscoutplayerComponent } from './modifyscoutplayer.component';

describe('ModifyscoutplayerComponent', () => {
  let component: ModifyscoutplayerComponent;
  let fixture: ComponentFixture<ModifyscoutplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyscoutplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyscoutplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
