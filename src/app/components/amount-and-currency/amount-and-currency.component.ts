import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-amount-and-currency',
  templateUrl: './amount-and-currency.component.html',
  styleUrls: ['./amount-and-currency.component.scss']
})
export class AmountAndCurrencyComponent implements OnInit {

  @Input() currencies: Array<string>;
  @Input() amount: number;
  @Output() amountChanged: EventEmitter<number> = new EventEmitter();

  currentCurrency: string;

  constructor() {
  }

  ngOnInit(): void {
    this.currentCurrency = this.currencies[0];
  }

  setAsCurrentCurrency(currencyToSet: string): void{
    this.currentCurrency = currencyToSet;
  }

  emitAmountChange(): void{
    this.amountChanged.emit(this.amount);
  }

}