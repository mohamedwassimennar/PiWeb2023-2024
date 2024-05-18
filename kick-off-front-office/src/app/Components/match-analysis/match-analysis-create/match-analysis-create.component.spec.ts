import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAnalysisCreateComponent } from './match-analysis-create.component';

describe('MatchAnalysisCreateComponent', () => {
  let component: MatchAnalysisCreateComponent;
  let fixture: ComponentFixture<MatchAnalysisCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchAnalysisCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchAnalysisCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
