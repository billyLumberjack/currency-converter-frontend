import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  requestedUrl: string;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      if (this.authenticationService.getCurrentUser){
          this.router.navigate(['/']);
      }
  }

  ngOnInit(): void  {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      this.requestedUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  displayValidationErrorsByName(formControlName: string): boolean {
    return this.loginForm.get(formControlName).invalid &&
      (this.loginForm.get(formControlName).dirty || this.loginForm.get(formControlName).touched);
  }

  validateFormAndAuthenticate(): void{
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }

    const credentialsToUse = this.loginForm.value;

    this.loading = true;
    this.authenticationService.loginAndCreateUserObservable(credentialsToUse.username, credentialsToUse.password)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.requestedUrl]);
            },
            httpError => {
                this.error = `Error code ${httpError.status} - '${httpError.error.message}'`;
                this.loading = false;
            });
  }
}
