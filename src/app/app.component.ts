import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './log/models/user';
import { UserService } from './log/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { logout, login } from './log/actions/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tourism-web';
  public currentUser: User;
  public user = new User();

  constructor(
    private router: Router,
    private userService: UserService,
    private loginStore: Store<AppState>
  ) {
    this.userService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.user = Object.assign(this.user, x);
    });
  }

  logout() {
    //this.userService.logout();
    //this.router.navigate(['/login']);
    this.loginStore.dispatch(logout());
  }
}
