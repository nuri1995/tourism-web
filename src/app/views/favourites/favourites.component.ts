import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/models/activity';
import { User } from 'src/app/shared/models/user';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  public favourites: Activity[];
  public favourite: Activity;

  public currentUser: User;
  public user: User = new User();

  constructor(private userService: UserService) {
    this.userService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.user = Object.assign(this.user, x);
      this.favourites = this.user.favActivities;

      console.log(this.currentUser);
      console.log(this.favourites);
    });
  }
  ngOnInit(): void {}

  public actions(id: number) {
    this.favourite = this.favourites.find((activity) => activity.id === id);
  }

  public cancelFavourite(id: number) {
    this.user.deleteFavourite(id);
    console.log(this.user);
    this.currentUser.favActivities = this.user.favActivities;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.favourites = this.currentUser.favActivities;
    this.favourite = undefined;
    /*
    this.userService.updateUser(this.currentUser).subscribe(() => {
      console.log(this.currentUser);
      this.favourites = this.currentUser.favActivities;
      this.favourite = undefined;
    });*/
  }
}
