import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-amount-and-currency',
  templateUrl: './amount-and-currency.component.html',
  styleUrls: ['./amount-and-currency.component.scss']
})
export class AmountAndCurrencyComponent implements OnInit {

  @Input() currencies: Array<string>;
  @Input() amount: number;
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
  }

  setAsCurrentCurrency(currencyToSet: string): void{
    this.currentCurrency = currencyToSet;
  }

  emitAmountChange(event: any): void{
    if (this.amountForm.valid){
      this.amountChanged.emit(this.amount);
    }
  }

  displayValidationErrorsByName(formControlName: string): boolean {
    return this.amountForm.get(formControlName).invalid &&
      (this.amountForm.get(formControlName).dirty || this.amountForm.get(formControlName).touched);
  }

}
