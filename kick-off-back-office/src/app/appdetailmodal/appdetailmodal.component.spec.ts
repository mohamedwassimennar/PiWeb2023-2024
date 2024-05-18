import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppdetailmodalComponent } from './appdetailmodal.component';

describe('AppdetailmodalComponent', () => {
  let component: AppdetailmodalComponent;
  let fixture: ComponentFixture<AppdetailmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppdetailmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppdetailmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
