import { Component, OnInit } from '@angular/core';

import { Activity } from 'src/app/activities/models/activity';
import { User } from 'src/app/log/models/user';
import { ActivitiesService } from 'src/app/activities/services/activities.service';
import { UserService } from 'src/app/log/services/user.service';

@Component({
  selector: 'app-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.css'],
})
export class MyActivitiesComponent implements OnInit {
  public activities: Activity[];
  public activity: Activity;

  public currentUser: User;
  public user: User = new User();

  constructor(
    private activitiesService: ActivitiesService,
    private userService: UserService
  ) {
    this.userService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.user = Object.assign(this.user, x);
    });
  }
  ngOnInit(): void {
    this.getActivities();
  }

  public getActivities() {
    this.activities = this.currentUser.regActivities;
  }

  public actions(id: number) {
    this.activity = this.activities.find((activity) => activity.id === id);
  }
  public saveFavourites() {
    this.user.favouriteActivity(this.activity);
    this.currentUser.favActivities = this.user.favActivities;

    this.userService.updateUser(this.currentUser).subscribe((user) => {
      console.log(this.currentUser);
    });
  }

  public cancel(id: number) {
    this.user.cancelActivity(id);

    this.currentUser.regActivities = this.user.regActivities;
    this.userService.updateUser(this.currentUser).subscribe(() => {
      console.log(this.currentUser);
      this.getActivities();
    });

    this.activity.peopleRegistered--;

    this.activitiesService
      .updateActivities(this.activity)
      .subscribe((activity) => {
        console.log(this.activity);
        this.activity = undefined;
      });
  }
}
