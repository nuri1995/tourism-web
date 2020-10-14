import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tourism-web';
  public currentUser: User;
  public user = new User();

  constructor(private router: Router, private userService: UserService) {
    this.userService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.user = Object.assign(this.user, x);
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
