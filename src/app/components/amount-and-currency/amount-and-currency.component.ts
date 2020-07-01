import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CurrenciesConversion } from '@app/models/currencies-conversion';

@Component({
  selector: 'app-amount-and-currency',
  templateUrl: './amount-and-currency.component.html',
  styleUrls: ['./amount-and-currency.component.scss']
})
export class AmountAndCurrencyComponent implements OnInit {

  @Input() currencies: Array<string>;
  @Output() amountChanged: EventEmitter<number> = new EventEmitter();

  amountForm: FormGroup;
  currentCurrency: string;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

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

    this.amountForm = this.formBuilder.group({
      amount: ['', [Validators.min(0), validateNumber]]
    });
    this.currentCurrency = this.currencies[0];
  }

  setAsCurrentCurrency(currencyToSet: string): void{
    this.currentCurrency = currencyToSet;
    this.amountChanged.emit(this.amountForm.get('amount').value);
  }

  emitAmountChange(event: any): void{
    if (this.amountForm.valid){
      this.amountChanged.emit(this.amountForm.get('amount').value);
    }
  }

  displayValidationErrorsByName(formControlName: string): boolean {
    return this.amountForm.get(formControlName).invalid &&
      (this.amountForm.get(formControlName).dirty || this.amountForm.get(formControlName).touched);
  }

}
