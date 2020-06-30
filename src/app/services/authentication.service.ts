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

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
      return this.userSubject.value;
  }

  login(username: string, password: string): Observable<User>{

      const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

      return this.http.get<User>(`${environment.apiUrl}/basicauth`, { headers })
          .pipe(map(user => {
              user.authdata = window.btoa(username + ':' + password);
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);
              return user;
          }));

  }

  createBasicAuthToken(username: string, password: string): string{
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  logout(): void {
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['/login']);
  }
}
