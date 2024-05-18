import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesummuryComponent } from './archivesummury.component';

describe('ArchivesummuryComponent', () => {
  let component: ArchivesummuryComponent;
  let fixture: ComponentFixture<ArchivesummuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivesummuryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivesummuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
