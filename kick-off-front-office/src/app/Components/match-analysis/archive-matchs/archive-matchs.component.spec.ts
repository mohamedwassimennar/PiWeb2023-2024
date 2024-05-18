import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveMatchsComponent } from './archive-matchs.component';

describe('ArchiveMatchsComponent', () => {
  let component: ArchiveMatchsComponent;
  let fixture: ComponentFixture<ArchiveMatchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveMatchsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveMatchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
