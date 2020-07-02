import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConverterApiService } from '@app/services/converter-api.service';
import { AmountAndCurrencyComponent } from '../amount-and-currency/amount-and-currency.component';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currencies: Array<string>;

  constructor(private converterApiService: ConverterApiService) { }

  @ViewChild('sourceAmountAndCurrency') sourceAmountAndCurrency: AmountAndCurrencyComponent;
  @ViewChild('destinationAmountAndCurrency') destinationAmountAndCurrency: AmountAndCurrencyComponent;

  ngOnInit(): void {
    this.converterApiService.getCurrencies().subscribe((currenciesFromApi) => {
      this.currencies = currenciesFromApi;
      this.setDropdwonValueByFormAndValue(
        this.sourceAmountAndCurrency.amountForm,
        this.currencies[0]
      );
      this.setDropdwonValueByFormAndValue(
        this.destinationAmountAndCurrency.amountForm,
        this.currencies[0]
      );
    });
  }

  handleSourceAmountChange(data: number): void{
    this.updateSourceAndDestinationForms(
      this.sourceAmountAndCurrency.amountForm,
      this.destinationAmountAndCurrency.amountForm
    );
  }
  handleSourceCurrencyChange(data: string): void{
    this.updateSourceAndDestinationForms(
      this.sourceAmountAndCurrency.amountForm,
      this.destinationAmountAndCurrency.amountForm
    );
  }
  handleDestinationAmountChange(data: number): void{
    this.updateSourceAndDestinationForms(
      this.destinationAmountAndCurrency.amountForm,
      this.sourceAmountAndCurrency.amountForm
    );
  }
  handleDestinationCurrencyChange(data: string): void{
    this.updateSourceAndDestinationForms(
      this.sourceAmountAndCurrency.amountForm,
      this.destinationAmountAndCurrency.amountForm
    );
  }

  private setDropdwonValueByFormAndValue(formToUpdate: FormGroup, newValue: string): void{
    formToUpdate.get('currencyDropdown').setValue(newValue, {emitEvent: false});
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
