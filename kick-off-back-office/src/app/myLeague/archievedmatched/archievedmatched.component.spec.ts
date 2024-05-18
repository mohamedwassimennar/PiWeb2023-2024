import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchievedmatchedComponent } from './archievedmatched.component';

describe('ArchievedmatchedComponent', () => {
  let component: ArchievedmatchedComponent;
  let fixture: ComponentFixture<ArchievedmatchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchievedmatchedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchievedmatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
