import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopplayerComponent } from './topplayer.component';

describe('TopplayerComponent', () => {
  let component: TopplayerComponent;
  let fixture: ComponentFixture<TopplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
