import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CurrenciesConversion } from '@app/models/currencies-conversion';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-amount-and-currency',
  templateUrl: './amount-and-currency.component.html',
  styleUrls: ['./amount-and-currency.component.scss']
})
export class AmountAndCurrencyComponent implements OnInit{

  @Input() currencies: Array<string>;
  @Output() amountChange: EventEmitter<number> = new EventEmitter();
  @Output() currencyChange: EventEmitter<string> = new EventEmitter();

  amountChangeSubject: Subject<any> = new Subject();
  currencyChangeSubject: Subject<any> = new Subject();

  amountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.amountForm = this.createFormForPositiveReal();
    this.amountForm.get('currencyDropdown').valueChanges.subscribe((newCurrency) => {
      this.currencyChangeSubject.next(newCurrency);
    });

    const millisecondsDebouncingTime = 500;
    const emitAmountChange = (newAmount: number) => {
      if (this.amountForm.valid){
        this.amountChange.emit(newAmount);
      }
    };
    const emitCurrencyChange = (newCurrency: string) => {
      this.currencyChange.emit(newCurrency);
    };

    this.executeCallbackByDebouncingTimeOnSubject(this.amountChangeSubject, millisecondsDebouncingTime, emitAmountChange);
    this.executeCallbackByDebouncingTimeOnSubject(this.currencyChangeSubject, millisecondsDebouncingTime, emitCurrencyChange);
  }

  handleAmountChange(): void{
    this.amountChangeSubject.next(this.amountForm.get('amount').value);
  }

  displayValidationErrorsByName(formControlName: string): boolean {
    return this.amountForm.get(formControlName).invalid &&
      (this.amountForm.get(formControlName).dirty || this.amountForm.get(formControlName).touched);
  }

  private executeCallbackByDebouncingTimeOnSubject<T>(
    subjectToSubscribeTo: Subject<T>, millisecondsDebouncingTime: number, subscriptionCallback: (data: T) => void
    ): void{
    subjectToSubscribeTo
      .pipe(debounceTime(millisecondsDebouncingTime))
      .subscribe(subscriptionCallback);
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
