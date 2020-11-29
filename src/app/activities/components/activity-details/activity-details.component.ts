import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css'],
})
export class ActivityDetailsComponent implements OnInit {
  @Input() public activity: Activity;
  @Input() public currentUser: User;

  constructor(
    private activitiesStore: Store<AppState>,
    private loginStore: Store<AppState>
  ) {}

  ngOnInit(): void {}

  public signUp() {
    this.currentUser.registerActivity(this.activity);
    console.log(this.currentUser);
    this.loginStore.dispatch(updateUser({ user: this.currentUser }));
    /* this.userService.updateUser(this.currentUser).subscribe((user) => {
      console.log(user);
    });*/

    console.log(this.activity);

    var _activity = new Activity();
    _activity = Object.assign(_activity, this.activity);
    _activity.addPeople();
    console.log('activity', _activity);

    if (_activity.peopleRegistered === _activity.maxCapacity) {
      _activity.state = 'Complete';
    }
    /*
    this.activitiesService
      .updateActivities(this.activity)
      .subscribe((activity) => {
        console.log(this.activity);
      });*/
    this.activitiesStore.dispatch(updateActivity({ activity: _activity }));
    this.activity = _activity;
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
