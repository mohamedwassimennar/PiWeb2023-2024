import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyleagueComponent } from './myleague.component';

describe('MyleagueComponent', () => {
  let component: MyleagueComponent;
  let fixture: ComponentFixture<MyleagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyleagueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyleagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
