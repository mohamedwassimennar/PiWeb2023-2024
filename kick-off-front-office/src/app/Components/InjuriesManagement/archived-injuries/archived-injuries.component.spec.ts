import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedInjuriesComponent } from './archived-injuries.component';

describe('ArchivedInjuriesComponent', () => {
  let component: ArchivedInjuriesComponent;
  let fixture: ComponentFixture<ArchivedInjuriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedInjuriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedInjuriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
