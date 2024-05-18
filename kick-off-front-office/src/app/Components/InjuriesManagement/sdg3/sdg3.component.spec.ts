import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sdg3Component } from './sdg3.component';

describe('Sdg3Component', () => {
  let component: Sdg3Component;
  let fixture: ComponentFixture<Sdg3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sdg3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sdg3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
