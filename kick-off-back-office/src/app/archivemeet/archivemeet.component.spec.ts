import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivemeetComponent } from './archivemeet.component';

describe('ArchivemeetComponent', () => {
  let component: ArchivemeetComponent;
  let fixture: ComponentFixture<ArchivemeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivemeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivemeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
