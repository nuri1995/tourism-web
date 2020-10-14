import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from 'src/app/shared/models/education';
import { Language } from 'src/app/shared/models/language';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  public currentUser: User = new User();
  public educations: Education[];
  public languages: Language[];

  constructor(
    private router: Router,

    private userService: UserService
  ) {
    this.userService.currentUser.subscribe((x) => {
      this.currentUser = Object.assign(this.currentUser, x);
      this.educations = this.currentUser.education;
      this.languages = this.currentUser.languages;
      console.log(this.currentUser);
      console.log(this.educations);
      console.log(this.languages);
    });
  }
  ngOnInit(): void {}

  public updateProfile() {
    this.router.navigate(['/profile']);
  }

  public newEducation() {
    this.router.navigate(['/education']);
  }
  public deleteEducation(id: number) {}

  public newLanguage() {
    this.router.navigate(['/languages']);
  }
  public deleteLanguage() {
    this.router.navigate(['/languages/:id']);
  }
}
