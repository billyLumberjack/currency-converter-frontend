import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-control-dropdown',
  templateUrl: './form-control-dropdown.component.html',
  styleUrls: ['./form-control-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormControlDropdownComponent),
    multi: true,
 }]
})
export class FormControlDropdownComponent implements OnInit, ControlValueAccessor {

  @Input() options: Array<string>;
  selectedOption: string;

  onChange: (_: any) => {};

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(value: string): void {
    this.selectedOption = value;
  }
  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
 }
  registerOnTouched(fn: any): void {
  }

  changeSelectedOption(option: string): void {
    this.selectedOption = option;
    this.onChange(option);
 }

}
