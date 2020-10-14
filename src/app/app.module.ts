import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/services/in-memory-data.service';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyActivitiesComponent } from './views/my-activities/my-activities.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { EducationComponent } from './views/education/education.component';
import { LanguagesComponent } from './views/languages/languages.component';
import { PopupComponent } from './views/popup/popup.component';
import { AdminComponent } from './views/admin/admin.component';
import { ActivitiesComponent } from './views/activities/activities.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MyActivitiesComponent,
    ProfileComponent,
    ProfilePageComponent,
    EducationComponent,
    LanguagesComponent,
    PopupComponent,
    AdminComponent,
    ActivitiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
