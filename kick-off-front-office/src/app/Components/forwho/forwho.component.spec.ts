import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwhoComponent } from './forwho.component';

describe('ForwhoComponent', () => {
  let component: ForwhoComponent;
  let fixture: ComponentFixture<ForwhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwhoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
