import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CurrenciesConversion } from '@app/models/currencies-conversion';

@Component({
  selector: 'app-amount-and-currency',
  templateUrl: './amount-and-currency.component.html',
  styleUrls: ['./amount-and-currency.component.scss']
})
export class AmountAndCurrencyComponent implements OnInit{

  @Input() currencies: Array<string>;
  @Output() amountChange: EventEmitter<number> = new EventEmitter();
  @Output() currencyChange: EventEmitter<number> = new EventEmitter();

  amountForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.amountForm = this.createFormForPositiveReal();
    this.amountForm.get('currencyDropdown').setValue(this.currencies[0]);
    this.amountForm.get('currencyDropdown').valueChanges.subscribe((newCurrency) => {
      this.currencyChange.emit(newCurrency);
    });
  }

  emitAmountChange(): void{
    if (this.amountForm.valid){
      this.amountChange.emit(this.amountForm.get('amount').value);
    }
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
      amount: ['', [Validators.min(0), validateNumber]],
      currencyDropdown: ['']
    });
  }

}
