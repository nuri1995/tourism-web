import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './components/activities/activities.component';
import { AdminComponent } from './components/admin/admin.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { HomeComponent } from './components/home/home.component';
import { MyActivitiesComponent } from './components/my-activities/my-activities.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from '../shared/popup/popup.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';

@NgModule({
  declarations: [
    ActivitiesComponent,
    AdminComponent,
    FavouritesComponent,
    HomeComponent,
    MyActivitiesComponent,
    ActivityDetailsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AppRoutingModule, SharedModule],
  exports: [
    ActivitiesComponent,
    AdminComponent,
    FavouritesComponent,
    HomeComponent,
    MyActivitiesComponent,
    ActivityDetailsComponent,
  ],
})
export class ActivitiesModule {}
