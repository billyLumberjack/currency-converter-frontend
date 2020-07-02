import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AmountAndCurrency } from '@app/models/amount-and-currency';

@Component({
  selector: 'app-amount-and-currency',
  templateUrl: './amount-and-currency.component.html',
  styleUrls: ['./amount-and-currency.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AmountAndCurrencyComponent),
    multi: true,
 }]
})
export class AmountAndCurrencyComponent implements OnInit, ControlValueAccessor{

  @Input() currencies: Array<string>;

  amountForm: FormGroup;
  currentAmountAndCurrency: AmountAndCurrency;

  constructor(private formBuilder: FormBuilder) {}

  onChange: (_: AmountAndCurrency) => {};

  writeValue(newAmountAndCurrency: AmountAndCurrency): void {
    this.currentAmountAndCurrency = newAmountAndCurrency;
    this.amountForm.get('amountInput').setValue(this.currentAmountAndCurrency.amount, {emitEvent: false});
    this.amountForm.get('currencyDropdown').setValue(this.currentAmountAndCurrency.currency, {emitEvent: false});
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
 }

  registerOnTouched(fn: any): void {}

  handleAmountChange(newAmount: number): void{
      this.currentAmountAndCurrency.amount = newAmount;
      if (this.amountForm.valid){
        this.onChange(this.currentAmountAndCurrency);
      }
  }

  handleCurrencyChange(newCurrency: string): void{
    this.currentAmountAndCurrency.currency = newCurrency;
    if (this.amountForm.valid){
      this.onChange(this.currentAmountAndCurrency);
    }
  }

  ngOnInit(): void {
    this.amountForm = this.createFormForPositiveReal();
    this.amountForm.get('currencyDropdown').valueChanges.subscribe((data) => {this.handleCurrencyChange(data); });
  }

  displayValidationErrorsByName(formControlName: string): boolean {
    return this.amountForm.get(formControlName).invalid &&
      (this.amountForm.get(formControlName).dirty || this.amountForm.get(formControlName).touched);
  }

  private createFormForPositiveReal(): FormGroup{
    const validateNumber = (c: FormControl) => {
      const errorToReturn = {
        validateNumber: {
          valid: false
        }
      };
      if (c.value == null){
        return errorToReturn;
      }
    };

    return this.formBuilder.group({
      amountInput: ['', [Validators.min(0), validateNumber]],
      currencyDropdown: ['', Validators.required]
    });
  }

}
