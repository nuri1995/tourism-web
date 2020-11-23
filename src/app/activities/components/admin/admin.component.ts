import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/activities/models/activity';

import { User } from 'src/app/log/models/user';
import { ActivitiesService } from 'src/app/activities/services/activities.service';
import { UserService } from 'src/app/log/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getActivities, deleteActivity } from '../../actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public currentUser: User = new User();
  public activities: Activity[];
  public activity: Activity;

  constructor(
    private router: Router,
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
    this.getActivities();
  }

  public getActivities() {
    /* this.activitiesService.getActivities().subscribe((activities) => {
      this.activities = activities;
    });*/
    this.activitiesStore.dispatch(getActivities());
  }

  public newActivity() {
    console.log('activities');
    this.router.navigate(['/activities']);
  }

  public deleteActivity(id: number) {
    let modal_t = document.getElementById('modal_1');
    modal_t.classList.remove('hhidden');
    modal_t.classList.add('sshow');
    this.activity = this.activities.find((activity) => activity.id === id);
    console.log(this.activity);
  }

  yes() {
    /*this.activitiesService.deleteActivity(this.activity).subscribe();
    this.getActivities();*/
    this.activitiesStore.dispatch(deleteActivity({ activity: this.activity }));

    let modal_t = document.getElementById('modal_1');
    modal_t.classList.remove('sshow');
    modal_t.classList.add('hhidden');
  }
  cancel() {
    let modal_t = document.getElementById('modal_1');
    modal_t.classList.remove('sshow');
    modal_t.classList.add('hhidden');
  }
}
