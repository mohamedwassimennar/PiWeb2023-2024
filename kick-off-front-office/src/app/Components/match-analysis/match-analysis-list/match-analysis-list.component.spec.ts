import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAnalysisListComponent } from './match-analysis-list.component';

describe('MatchAnalysisListComponent', () => {
  let component: MatchAnalysisListComponent;
  let fixture: ComponentFixture<MatchAnalysisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchAnalysisListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchAnalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
