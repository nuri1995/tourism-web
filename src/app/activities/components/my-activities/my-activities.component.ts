import { Component, OnInit } from '@angular/core';

import { Activity } from 'src/app/activities/models/activity';
import { User } from 'src/app/log/models/user';
import { ActivitiesService } from 'src/app/activities/services/activities.service';
import { UserService } from 'src/app/log/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { updateUser } from 'src/app/log/actions';
import { updateActivity } from '../../actions';

@Component({
  selector: 'app-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.css'],
})
export class MyActivitiesComponent implements OnInit {
  public activities: Activity[];
  public activity: Activity;

  public currentUser: User = new User();
  public user: User = new User();

  constructor(
    private activitiesService: ActivitiesService,
    private userService: UserService,
    private activitiesStore: Store<AppState>,
    private loginStore: Store<AppState>
  ) {
    /* this.userService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.user = Object.assign(this.user, x);
    });*/
    this.loginStore.select('loginApp').subscribe((loginResponse) => {
      this.currentUser = new User();
      this.currentUser = Object.assign(this.currentUser, loginResponse.login);
      this.getActivities();
    });
  }
  ngOnInit(): void {
    // this.getActivities();
    console.log(this.currentUser);
  }

  public getActivities() {
    this.activities = this.currentUser.regActivities;
  }

  public actions(id: number) {
    this.activity = this.activities.find((activity) => activity.id === id);
  }
  public saveFavourites() {
    this.currentUser.favouriteActivity(this.activity);
    // this.currentUser.favActivities = this.user.favActivities;

    this.loginStore.dispatch(updateUser({ user: this.currentUser }));
  }

  public cancel(id: number) {
    this.currentUser.cancelActivity(id);

    //this.currentUser.regActivities = this.user.regActivities;

    this.loginStore.dispatch(updateUser({ user: this.currentUser }));

    var _activity = new Activity();
    _activity = Object.assign(_activity, this.activity);
    _activity.cancelPeople();
    console.log('activity', _activity);

    if (_activity.peopleRegistered < _activity.maxCapacity) {
      _activity.state = 'Places available';
    }

    this.activitiesStore.dispatch(updateActivity({ activity: _activity }));
    this.activity = undefined;
  }
}
