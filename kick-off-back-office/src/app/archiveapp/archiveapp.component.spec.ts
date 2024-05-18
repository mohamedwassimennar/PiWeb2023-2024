import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveappComponent } from './archiveapp.component';

describe('ArchiveappComponent', () => {
  let component: ArchiveappComponent;
  let fixture: ComponentFixture<ArchiveappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
