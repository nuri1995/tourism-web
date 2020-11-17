import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EducationComponent } from './components/education/education.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EducationComponent,
    LanguagesComponent,
    ProfileComponent,
    ProfilePageComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AppRoutingModule, SharedModule],
  exports: [
    EducationComponent,
    LanguagesComponent,
    ProfileComponent,
    ProfilePageComponent,
  ],
})
export class ProfileModule {}
