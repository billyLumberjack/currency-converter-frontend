import { Component, OnInit, ViewChild } from '@angular/core';
import { ConverterApiService } from '@app/services/converter-api.service';
import { AmountAndCurrencyComponent } from '../amount-and-currency/amount-and-currency.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currencies: Array<string> = [];

  sourceAmount: number;
  destinationAmount: number;

  sourceCurrency: string = 'EUR';
  destinationCurrency: string = 'BTC';

  constructor(private converterApiService: ConverterApiService) { }

  @ViewChild('sourceAmountAndCurrency') sourceAmountAndCurrency: AmountAndCurrencyComponent;
  @ViewChild('destinationAmountAndCurrency') destinationAmountAndCurrency: AmountAndCurrencyComponent;

  ngOnInit(): void {
    this.converterApiService.getCurrencies().subscribe((currenciesFromApi) => {
      this.currencies = currenciesFromApi;
    });
  }

  sourceAmountChanged(newSourceAmount: number): void{
    this.sourceAmount = newSourceAmount;
    this.converterApiService
      .convert(this.sourceCurrency, this.destinationCurrency, this.sourceAmount)
      .subscribe((updatedConversion) => {
        this.destinationAmountAndCurrency.amountForm.get('amount').setValue(updatedConversion.destinationAmount);
      });
  }

  destinationAmountChanged(newDestinationAmount: number): void{
    this.destinationAmount = newDestinationAmount;
    this.converterApiService
      .convert(this.destinationCurrency, this.sourceCurrency, this.destinationAmount)
      .subscribe((updatedConversion) => {
        this.sourceAmountAndCurrency.amountForm.get('amount').setValue(updatedConversion.destinationAmount);
      });
  }

}
