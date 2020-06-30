import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserBehaviorSubject: BehaviorSubject<User>;
  public currentUserObservable: Observable<User>;
  private localStorageUserKey = 'user';

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
      this.currentUserBehaviorSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
      this.currentUserObservable = this.currentUserBehaviorSubject.asObservable();
  }

  public get getCurrentUser(): User {
      return this.currentUserBehaviorSubject.value;
  }

  loginAndCreateUserObservable(username: string, password: string): Observable<User>{
      const basicAuthHeaders = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
      return this.http.get<User>(environment.apiUrl + environment.authenticationEndpoint, { headers: basicAuthHeaders })
          .pipe(map(authEndpointResponse => {
              const toStoreUser: User = new User();
              toStoreUser.authdata = window.btoa(username + ':' + password);
              localStorage.setItem(this.localStorageUserKey, JSON.stringify(toStoreUser));
              this.currentUserBehaviorSubject.next(toStoreUser);
              return toStoreUser;
          }));
  }

  createBasicAuthToken(username: string, password: string): string{
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  logout(): void {
      localStorage.removeItem(this.localStorageUserKey);
      this.currentUserBehaviorSubject.next(null);
      this.router.navigate(['/login']);
  }

  private getUserFromLocalStorage(): User{
    return JSON.parse(localStorage.getItem(this.localStorageUserKey)) as User;
  }
}
