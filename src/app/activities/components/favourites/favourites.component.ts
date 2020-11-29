import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/activities/models/activity';
import { User } from 'src/app/log/models/user';
import { ActivitiesService } from 'src/app/activities/services/activities.service';
import { UserService } from 'src/app/log/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { updateUser } from 'src/app/log/actions';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  public favourites: Activity[];
  public favourite: Activity;

  public currentUser: User = new User();
  public user: User = new User();

  constructor(
    private userService: UserService,
    private loginStore: Store<AppState>
  ) {
    /*this.userService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.user = Object.assign(this.user, x);
      this.favourites = this.user.favActivities;

      console.log(this.currentUser);
      console.log(this.favourites);
    });*/
    this.loginStore.select('loginApp').subscribe((loginResponse) => {
      this.currentUser = new User();
      this.currentUser = Object.assign(this.currentUser, loginResponse.login);
      this.favourites = this.currentUser.favActivities;
    });
  }
  ngOnInit(): void {}

  public actions(id: number) {
    this.favourite = this.favourites.find((activity) => activity.id === id);
  }

  public cancelFavourite(id: number) {
    /*this.user.deleteFavourite(id);
    console.log(this.user);
    this.currentUser.favActivities = this.user.favActivities;

    this.userService.updateUser(this.currentUser).subscribe(() => {
      console.log(this.currentUser);
      this.favourites = this.currentUser.favActivities;
      this.favourite = undefined;
    });*/
    this.currentUser.deleteFavourite(id);
    console.log(this.user);
    this.loginStore.dispatch(updateUser({ user: this.currentUser }));
    this.favourite = undefined;
  }
}
