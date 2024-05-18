import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivematchComponent } from './archivematch.component';

describe('ArchivematchComponent', () => {
  let component: ArchivematchComponent;
  let fixture: ComponentFixture<ArchivematchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivematchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivematchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
