import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyActivitiesComponent } from './views/my-activities/my-activities.component';
import { EducationComponent } from './views/education/education.component';
import { HomeComponent } from './views/home/home.component';
import { LanguagesComponent } from './views/languages/languages.component';
import { LoginComponent } from './views/login/login.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './views/register/register.component';
import { AdminComponent } from './views/admin/admin.component';
import { ActivitiesComponent } from './views/activities/activities.component';
import { FavouritesComponent } from './views/favourites/favourites.component';

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
