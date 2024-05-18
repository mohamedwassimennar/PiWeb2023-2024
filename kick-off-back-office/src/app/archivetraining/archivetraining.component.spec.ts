import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivetrainingComponent } from './archivetraining.component';

describe('ArchivetrainingComponent', () => {
  let component: ArchivetrainingComponent;
  let fixture: ComponentFixture<ArchivetrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivetrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivetrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
