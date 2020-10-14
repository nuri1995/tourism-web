import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/shared/models/activity';
import { User } from 'src/app/shared/models/user';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public activities: Activity[];
  public activity: Activity = new Activity();
  public currentUser: User = new User();

  constructor(
    private activitiesService: ActivitiesService,
    private userService: UserService
  ) {
    this.userService.currentUser.subscribe((x) => {
      this.currentUser = Object.assign(this.currentUser, x);
    });
  }
  ngOnInit(): void {
    this.getActivities();
  }

  public getActivities() {
    this.activitiesService.getActivities().subscribe((activities) => {
      this.activities = activities;
    });
  }
  public actions(id: number) {
    this.activity = new Activity();
    this.activity = Object.assign(
      this.activity,
      this.activities.find((activity) => activity.id === id)
    );
  }

  public signUp() {
    this.currentUser.registerActivity(this.activity);
    this.userService.updateUser(this.currentUser).subscribe((user) => {
      console.log(user);
    });

    this.activity.peopleRegistered++;
    if (this.activity.peopleRegistered === this.activity.maxCapacity) {
      this.activity.state = 'Complete';
    }
    this.activitiesService
      .updateActivities(this.activity)
      .subscribe((activity) => {
        console.log(activity);
      });
  }

  public saveFavourites() {
    this.currentUser.favouriteActivity(this.activity);
    this.userService.updateUser(this.currentUser).subscribe((user) => {
      console.log(this.currentUser);
    });
  }
}
