import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainigdetailmodalComponent } from './trainigdetailmodal.component';

describe('TrainigdetailmodalComponent', () => {
  let component: TrainigdetailmodalComponent;
  let fixture: ComponentFixture<TrainigdetailmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainigdetailmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainigdetailmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
