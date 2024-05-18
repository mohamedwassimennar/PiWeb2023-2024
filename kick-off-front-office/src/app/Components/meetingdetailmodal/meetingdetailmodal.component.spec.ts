import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingdetailmodalComponent } from './meetingdetailmodal.component';

describe('MeetingdetailmodalComponent', () => {
  let component: MeetingdetailmodalComponent;
  let fixture: ComponentFixture<MeetingdetailmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingdetailmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingdetailmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
