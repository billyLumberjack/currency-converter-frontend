import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/services/authentication.service';
import { User } from '@app/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUserObservable.subscribe(currentUser => this.user = currentUser);
  }

  logout(): void {
      this.authenticationService.logout();
  }
}
