import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchievedplayersComponent } from './archievedplayers.component';

describe('ArchievedplayersComponent', () => {
  let component: ArchievedplayersComponent;
  let fixture: ComponentFixture<ArchievedplayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchievedplayersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchievedplayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
