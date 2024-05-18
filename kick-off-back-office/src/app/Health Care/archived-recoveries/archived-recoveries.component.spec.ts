import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedRecoveriesComponent } from './archived-recoveries.component';

describe('ArchivedRecoveriesComponent', () => {
  let component: ArchivedRecoveriesComponent;
  let fixture: ComponentFixture<ArchivedRecoveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedRecoveriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedRecoveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
