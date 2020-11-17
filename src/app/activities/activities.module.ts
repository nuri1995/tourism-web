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

@NgModule({
  declarations: [
    ActivitiesComponent,
    AdminComponent,
    FavouritesComponent,
    HomeComponent,
    MyActivitiesComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AppRoutingModule, SharedModule],
  exports: [
    ActivitiesComponent,
    AdminComponent,
    FavouritesComponent,
    HomeComponent,
    MyActivitiesComponent,
  ],
})
export class ActivitiesModule {}
