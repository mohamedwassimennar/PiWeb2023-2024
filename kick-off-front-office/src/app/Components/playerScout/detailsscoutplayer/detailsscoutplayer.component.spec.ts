import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsscoutplayerComponent } from './detailsscoutplayer.component';

describe('DetailsscoutplayerComponent', () => {
  let component: DetailsscoutplayerComponent;
  let fixture: ComponentFixture<DetailsscoutplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsscoutplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsscoutplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
