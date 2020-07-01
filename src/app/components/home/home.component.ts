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

  constructor(private converterApiService: ConverterApiService) { }

  @ViewChild('sourceAmountAndCurrency') sourceAmountAndCurrency: AmountAndCurrencyComponent;
  @ViewChild('destinationAmountAndCurrency') destinationAmountAndCurrency: AmountAndCurrencyComponent;

  ngOnInit(): void {
    this.converterApiService.getCurrencies().subscribe((currenciesFromApi) => {
      this.currencies = currenciesFromApi;
    });
  }

  sourceAmountChanged(newSourceAmount: number): void{

    const amountToConvert = this.sourceAmountAndCurrency.amountForm.get('amount').value;
    const sourceCurrency = this.sourceAmountAndCurrency.currentCurrency;
    const destinationCurrency = this.destinationAmountAndCurrency.currentCurrency;

    this.converterApiService
      .convert(sourceCurrency, destinationCurrency, amountToConvert)
      .subscribe((updatedConversion) => {
        this.destinationAmountAndCurrency.amountForm.get('amount').setValue(updatedConversion.destinationAmount);
      });
  }

  destinationAmountChanged(newDestinationAmount: number): void{
    const amountToConvert = this.destinationAmountAndCurrency.amountForm.get('amount').value;
    const sourceCurrency = this.destinationAmountAndCurrency.currentCurrency;
    const destinationCurrency = this.sourceAmountAndCurrency.currentCurrency;

    this.converterApiService
      .convert(sourceCurrency, destinationCurrency, amountToConvert)
      .subscribe((updatedConversion) => {
        this.sourceAmountAndCurrency.amountForm.get('amount').setValue(updatedConversion.destinationAmount);
      });
  }

}
