import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagedetailmodalComponent } from './stagedetailmodal.component';

describe('StagedetailmodalComponent', () => {
  let component: StagedetailmodalComponent;
  let fixture: ComponentFixture<StagedetailmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagedetailmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StagedetailmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
