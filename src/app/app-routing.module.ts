import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activities/components/activities/activities.component';
import { AdminComponent } from './activities/components/admin/admin.component';
import { FavouritesComponent } from './activities/components/favourites/favourites.component';
import { HomeComponent } from './activities/components/home/home.component';
import { MyActivitiesComponent } from './activities/components/my-activities/my-activities.component';

import { LoginComponent } from './log/components/login/login.component';
import { RegisterComponent } from './log/components/register/register.component';
import { EducationComponent } from './profile/components/education/education.component';
import { LanguagesComponent } from './profile/components/languages/languages.component';
import { ProfilePageComponent } from './profile/components/profile-page/profile-page.component';
import { ProfileComponent } from './profile/components/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-activities', component: MyActivitiesComponent },
  { path: 'profile-page', component: ProfilePageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'education', component: EducationComponent },
  { path: 'education/:id', component: EducationComponent },
  { path: 'languages', component: LanguagesComponent },
  { path: 'languages/:id', component: LanguagesComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'activities/:id', component: ActivitiesComponent },
  { path: 'favourites', component: FavouritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
