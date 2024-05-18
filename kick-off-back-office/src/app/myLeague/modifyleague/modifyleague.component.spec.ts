import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyleagueComponent } from './modifyleague.component';

describe('ModifyleagueComponent', () => {
  let component: ModifyleagueComponent;
  let fixture: ComponentFixture<ModifyleagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyleagueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyleagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
