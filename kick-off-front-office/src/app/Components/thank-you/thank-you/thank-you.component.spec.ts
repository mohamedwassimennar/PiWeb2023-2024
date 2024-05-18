import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouComponent } from './thank-you.component';

describe('ThankYouComponent', () => {
  let component: ThankYouComponent;
  let fixture: ComponentFixture<ThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankYouComponent ]
    })
    .compileComponents();

<<<<<<<< HEAD:src/app/shared/footer/footer.component.spec.ts
    fixture = TestBed.createComponent(FooterComponent);
========
    fixture = TestBed.createComponent(ThankYouComponent);
>>>>>>>> origin/Training_Management:src/app/Components/thank-you/thank-you/thank-you.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
