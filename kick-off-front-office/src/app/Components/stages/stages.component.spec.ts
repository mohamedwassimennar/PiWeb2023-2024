import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesComponent } from './stages.component';

describe('StagesComponent', () => {
  let component: StagesComponent;
  let fixture: ComponentFixture<StagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StagesComponent]
    })
      .compileComponents();

<<<<<<<< HEAD: src / app / shared / header / header.component.spec.ts
    fixture = TestBed.createComponent(HeaderComponent);
========
    fixture = TestBed.createComponent(StagesComponent);
>>>>>>>> origin/Training_Management:src/app/Components/stages/stages.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
