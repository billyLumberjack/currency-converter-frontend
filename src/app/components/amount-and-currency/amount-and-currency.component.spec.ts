import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountAndCurrencyComponent } from './amount-and-currency.component';

describe('AmountAndCurrencyComponent', () => {
  let component: AmountAndCurrencyComponent;
  let fixture: ComponentFixture<AmountAndCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountAndCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountAndCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
