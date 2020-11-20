import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/activities/models/activity';
import { User } from 'src/app/log/models/user';
import { ActivitiesService } from 'src/app/activities/services/activities.service';
import { UserService } from 'src/app/log/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import {
  getActivities,
  updateActivity,
  updateActivityFailure,
} from '../../actions';
import { updateUser } from 'src/app/log/actions';

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
    private userService: UserService,
    private activitiesStore: Store<AppState>,
    private loginStore: Store<AppState>
  ) {
    /*this.userService.currentUser.subscribe((x) => {
      this.currentUser = Object.assign(this.currentUser, x);
    });*/
    this.loginStore.select('loginApp').subscribe((loginResponse) => {
      this.currentUser = Object.assign(this.currentUser, loginResponse.login);
    });
  }
  ngOnInit(): void {
    this.activitiesStore
      .select('activitiesApp')
      .subscribe((activitiesResponse) => {
        this.activities = activitiesResponse.activities;
      });
    this.activitiesStore.dispatch(getActivities());
    //this.getActivities();
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
    console.log(this.currentUser);
    this.loginStore.dispatch(updateUser({ user: this.currentUser }));
    /* this.userService.updateUser(this.currentUser).subscribe((user) => {
      console.log(user);
    });*/

    console.log(this.activity);

    //this.activity.peopleRegistered++;
    this.activity.addPeople();
    if (this.activity.peopleRegistered === this.activity.maxCapacity) {
      this.activity.state = 'Complete';
    }
    /*
    this.activitiesService
      .updateActivities(this.activity)
      .subscribe((activity) => {
        console.log(this.activity);
      });*/
    this.activitiesStore.dispatch(updateActivity({ activity: this.activity }));
  }

  public saveFavourites() {
    console.log(this.currentUser);
    console.log(this.activity);
    this.currentUser.favouriteActivity(this.activity);
    this.loginStore.dispatch(updateUser({ user: this.currentUser }));
    /*this.userService.updateUser(this.currentUser).subscribe((user) => {
      console.log(this.currentUser);
    });*/
  }
}
