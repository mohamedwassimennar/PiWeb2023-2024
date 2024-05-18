import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedPreventionsComponent } from './archived-preventions.component';

describe('ArchivedPreventionsComponent', () => {
  let component: ArchivedPreventionsComponent;
  let fixture: ComponentFixture<ArchivedPreventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedPreventionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedPreventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
