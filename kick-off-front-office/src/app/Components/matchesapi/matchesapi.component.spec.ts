import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesapiComponent } from './matchesapi.component';

describe('MatchesapiComponent', () => {
  let component: MatchesapiComponent;
  let fixture: ComponentFixture<MatchesapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesapiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchesapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
