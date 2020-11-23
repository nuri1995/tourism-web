import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from 'src/app/profile/models/education';
import { Language } from 'src/app/profile/models/language';
import { User } from 'src/app/log/models/user';
import { UserService } from 'src/app/log/services/user.service';
import { PopupComponent } from 'src/app/shared/popup/popup.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { updateUser } from 'src/app/log/actions';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  public currentUser: User = new User();
  public user: User = new User();
  public educations: Education[];
  public languages: Language[];
  public deleteRow: string;
  public id: number;

  constructor(
    private router: Router,
    private loginStore: Store<AppState>,
    private userService: UserService
  ) {
    /*
    this.userService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.user = Object.assign(this.user, x);
      this.educations = this.user.education;
      this.languages = this.user.languages;
      console.log(this.currentUser);
      console.log(this.educations);
      console.log(this.languages);
    });*/
    this.loginStore.select('loginApp').subscribe((loginResponse) => {
      this.currentUser = loginResponse.login;
      this.user = new User();
      this.user = Object.assign(this.user, loginResponse.login);
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
  public deleteEducation(id: number) {
    let modal_t = document.getElementById('modal_1');
    modal_t.classList.remove('hhidden');
    modal_t.classList.add('sshow');
    this.deleteRow = 'education';
    this.id = id;
  }

  public newLanguage() {
    this.router.navigate(['/languages']);
  }
  public deleteLanguage(id: number) {
    let modal_t = document.getElementById('modal_1');
    modal_t.classList.remove('hhidden');
    modal_t.classList.add('sshow');
    this.deleteRow = 'language';
    this.id = id;
  }

  yes() {
    if (this.deleteRow === 'education') {
      this.user.deleteEducation(this.id);
      //this.currentUser.education = this.user.education;
      /*this.userService.updateUser(this.currentUser).subscribe(() => {
        console.log(this.currentUser);
        this.educations = this.currentUser.education;
      });*/
    } else if (this.deleteRow === 'language') {
      this.user.deleteLanguage(this.id);
      // this.currentUser.languages = this.user.languages;
      /*this.userService.updateUser(this.currentUser).subscribe(() => {
        console.log(this.currentUser);
        this.languages = this.currentUser.languages;
      });*/
    }
    this.loginStore.dispatch(updateUser({ user: this.user }));

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
