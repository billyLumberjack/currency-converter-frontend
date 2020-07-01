import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConverterApiService } from '@app/services/converter-api.service';
import { AmountAndCurrencyComponent } from '../amount-and-currency/amount-and-currency.component';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  currencies: Array<string> = [];

  constructor(private converterApiService: ConverterApiService) { }

  @ViewChild('sourceAmountAndCurrency') sourceAmountAndCurrency: AmountAndCurrencyComponent;
  @ViewChild('destinationAmountAndCurrency') destinationAmountAndCurrency: AmountAndCurrencyComponent;

  ngOnInit(): void {
    this.converterApiService.getCurrencies().subscribe((currenciesFromApi) => {
      this.currencies = currenciesFromApi;
    });

  }

  ngAfterViewInit(): void {
    this.sourceAmountAndCurrency.amountForm.get('currencyDropdown').valueChanges.subscribe((newVal) => {
      this.handleSourceAmountOrCurrencyChange();
    });
    this.destinationAmountAndCurrency.amountForm.get('currencyDropdown').valueChanges.subscribe((newVal) => {
      this.handleDestinationAmountOrCurrencyChange();
    });
  }

  handleSourceAmountOrCurrencyChange(): void{
    this.updateSourceAndDestinationForms(this.sourceAmountAndCurrency.amountForm, this.destinationAmountAndCurrency.amountForm);
  }

  handleDestinationAmountOrCurrencyChange(): void{
    this.updateSourceAndDestinationForms(this.destinationAmountAndCurrency.amountForm, this.sourceAmountAndCurrency.amountForm);
  }

  private updateSourceAndDestinationForms(updatedFormGroup: FormGroup, toUpdateFormGroup: FormGroup): void{
    const amountToConvert = updatedFormGroup.get('amount').value;
    const sourceCurrency = updatedFormGroup.get('currencyDropdown').value;
    const destinationCurrency = toUpdateFormGroup.get('currencyDropdown').value;

    this.converterApiService
      .convert(sourceCurrency, destinationCurrency, amountToConvert)
      .subscribe((updatedConversion) => {
        toUpdateFormGroup.get('amount').setValue(updatedConversion.destinationAmount);
      });
  }

}
