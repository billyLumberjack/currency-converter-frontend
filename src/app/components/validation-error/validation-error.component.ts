import { Component, OnInit, Input, Host } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss']
})
export class ValidationErrorComponent implements OnInit {

  @Input() errors: ValidationErrors;
  objectKeys = Object.keys;

  constructor() {}

  ngOnInit(): void  {}

  private getErrorBessageByKey(errorKey: string){

    let errorMessage: string;

    switch (errorKey){
      case 'min' : errorMessage = `` ; break;
      case 'max' : errorMessage = `` ; break;
      case 'required' : errorMessage = `This field is required`  ; break;
      case 'email' : errorMessage = `Please insert a valid email address` ; break;
      case 'minlength' : errorMessage = `Please insert at least ${this.errors.minlength.requiredLength} characters` ; break;
      case 'maxlength' : errorMessage = `Please insert at most ${this.errors.maxlength.requiredLength} characters` ; break;
      case 'pattern' : errorMessage = `Please respect pattern ${this.errors.pattern.requiredPattern}` ; break;
    }

    console.log("getErrorBessageByKey : " , errorMessage);



    return errorMessage;
  }

}
