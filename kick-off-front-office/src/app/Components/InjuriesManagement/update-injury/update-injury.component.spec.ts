import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInjuryComponent } from './update-injury.component';

describe('UpdateInjuryComponent', () => {
  let component: UpdateInjuryComponent;
  let fixture: ComponentFixture<UpdateInjuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInjuryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInjuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
