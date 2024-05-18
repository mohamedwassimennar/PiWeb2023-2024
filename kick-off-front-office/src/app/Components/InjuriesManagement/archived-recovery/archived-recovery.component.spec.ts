import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedRecoveryComponent } from './archived-recovery.component';

describe('ArchivedRecoveryComponent', () => {
  let component: ArchivedRecoveryComponent;
  let fixture: ComponentFixture<ArchivedRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedRecoveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
