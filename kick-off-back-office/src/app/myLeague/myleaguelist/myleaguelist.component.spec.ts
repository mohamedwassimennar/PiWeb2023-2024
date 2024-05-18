import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyleaguelistComponent } from './myleaguelist.component';

describe('MyleaguelistComponent', () => {
  let component: MyleaguelistComponent;
  let fixture: ComponentFixture<MyleaguelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyleaguelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyleaguelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
