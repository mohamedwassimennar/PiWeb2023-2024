import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExterneInjuriesComponent } from './externe-injuries.component';

describe('ExterneInjuriesComponent', () => {
  let component: ExterneInjuriesComponent;
  let fixture: ComponentFixture<ExterneInjuriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExterneInjuriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExterneInjuriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
