import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConverterApiService } from '@app/services/converter-api.service';
import { AmountAndCurrencyComponent } from '../amount-and-currency/amount-and-currency.component';
import { ControlContainer, FormGroup, FormControl, Validators, Form, ControlValueAccessor, AbstractControl } from '@angular/forms';
import { AmountAndCurrency } from '@app/models/amount-and-currency';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currencies: Array<string> = [];

  currenciesConverterForm = new FormGroup({
    sourceAmountAndCurrencyControl: new FormControl(new AmountAndCurrency()),
    destinationAmountAndCurrencyControl: new FormControl(new AmountAndCurrency())
 });

  constructor(private converterApiService: ConverterApiService) { }

  ngOnInit(): void {
    this.converterApiService.getCurrencies().subscribe((currenciesFromApi) => {
      this.currencies = currenciesFromApi;

      this.initEmptyControlWithName('sourceAmountAndCurrencyControl');
      this.initEmptyControlWithName('destinationAmountAndCurrencyControl');

      this.currenciesConverterForm
        .get('sourceAmountAndCurrencyControl')
        .valueChanges
        .subscribe((newAmountAndCurrency: AmountAndCurrency) => {
          this.updateControlWithName('destinationAmountAndCurrencyControl', newAmountAndCurrency);
        });

      this.currenciesConverterForm
        .get('destinationAmountAndCurrencyControl')
        .valueChanges
        .subscribe((newAmountAndCurrency: AmountAndCurrency) => {
          this.updateControlWithName('sourceAmountAndCurrencyControl', newAmountAndCurrency);
        });
    });
  }

  private updateControlWithName(controlToUpdate: string, newAmountAndCurrency: AmountAndCurrency): void{
    const toUpdateControl = this.currenciesConverterForm.get(controlToUpdate);
    const toUpdateAmountAndCurrency: AmountAndCurrency = toUpdateControl.value;

    this.converterApiService
      .convert(newAmountAndCurrency.currency, toUpdateAmountAndCurrency.currency, newAmountAndCurrency.amount)
      .subscribe((updatedConversion) => {
        toUpdateAmountAndCurrency.amount = updatedConversion.destinationAmount;
        toUpdateControl.setValue(toUpdateAmountAndCurrency, {emitEvent: false});
      });
  }

  initEmptyControlWithName(name: string): void{
    const toUpdateAmountAndCurrency: AmountAndCurrency = this.currenciesConverterForm.get(name).value;
    toUpdateAmountAndCurrency.currency = this.currencies[0];
    this.currenciesConverterForm.get(name).setValue(toUpdateAmountAndCurrency);
  }
}
