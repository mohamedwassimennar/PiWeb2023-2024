import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAnalysisUpdateComponent } from './match-analysis-update.component';

describe('MatchAnalysisUpdateComponent', () => {
  let component: MatchAnalysisUpdateComponent;
  let fixture: ComponentFixture<MatchAnalysisUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchAnalysisUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchAnalysisUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
