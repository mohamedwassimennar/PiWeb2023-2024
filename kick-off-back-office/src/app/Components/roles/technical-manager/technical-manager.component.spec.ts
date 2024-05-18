import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalManagerComponent } from './technical-manager.component';

describe('TechnicalManagerComponent', () => {
  let component: TechnicalManagerComponent;
  let fixture: ComponentFixture<TechnicalManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
