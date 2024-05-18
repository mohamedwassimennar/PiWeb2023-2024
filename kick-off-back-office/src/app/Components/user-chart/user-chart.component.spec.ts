import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChartComponent } from './user-chart.component';

describe('UserChartComponent', () => {
  let component: UserChartComponent;
  let fixture: ComponentFixture<UserChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
