import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePreventionComponent } from './update-prevention.component';

describe('UpdatePreventionComponent', () => {
  let component: UpdatePreventionComponent;
  let fixture: ComponentFixture<UpdatePreventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePreventionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePreventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
