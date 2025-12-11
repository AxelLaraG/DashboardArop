import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentChart } from './payment-chart';

describe('PaymentChart', () => {
  let component: PaymentChart;
  let fixture: ComponentFixture<PaymentChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
