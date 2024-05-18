import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetnigComponent } from './meetnig.component';

describe('MeetnigComponent', () => {
  let component: MeetnigComponent;
  let fixture: ComponentFixture<MeetnigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetnigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetnigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
