import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/shared/models/activity';

import { User } from 'src/app/shared/models/user';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { UserService } from 'src/app/shared/services/user.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public currentUser: User = new User();
  public activities: Activity[];

  constructor(
    private router: Router,
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

  public newActivity() {
    console.log('activities');
    this.router.navigate(['/activities']);
  }

  public deleteActivity(id: number) {}
}
