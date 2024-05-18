import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddscoutplayerComponent } from './addscoutplayer.component';

describe('AddscoutplayerComponent', () => {
  let component: AddscoutplayerComponent;
  let fixture: ComponentFixture<AddscoutplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddscoutplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddscoutplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
