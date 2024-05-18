import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAnalysisDetailsComponent } from './match-analysis-details.component';

describe('MatchAnalysisDetailsComponent', () => {
  let component: MatchAnalysisDetailsComponent;
  let fixture: ComponentFixture<MatchAnalysisDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchAnalysisDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchAnalysisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
