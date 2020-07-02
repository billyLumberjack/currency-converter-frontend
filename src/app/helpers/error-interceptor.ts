import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
          .handle(request)
          .pipe(catchError((error) => {
            if (error.status === 401) {
              this.authenticationService.logout();
            }
            console.error(`Backend returned code ${error.status} body was: ${error.error.message}`);
            console.error(error);
            return throwError(error);
          }));
    }
}
