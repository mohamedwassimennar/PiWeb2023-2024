import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPreventionComponent } from './add-prevention.component';

describe('AddPreventionComponent', () => {
  let component: AddPreventionComponent;
  let fixture: ComponentFixture<AddPreventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPreventionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPreventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
