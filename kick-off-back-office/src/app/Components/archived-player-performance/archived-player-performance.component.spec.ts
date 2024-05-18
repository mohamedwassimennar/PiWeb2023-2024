import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedPlayerPerformanceComponent } from './archived-player-performance.component';

describe('ArchivedPlayerPerformanceComponent', () => {
  let component: ArchivedPlayerPerformanceComponent;
  let fixture: ComponentFixture<ArchivedPlayerPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedPlayerPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedPlayerPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
