import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoSpaces } from 'src/app/shared/directives/no-spaces.validator';
import { Language } from 'src/app/profile/models/language';
import { User } from 'src/app/log/models/user';
import { UserService } from 'src/app/log/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { updateUser } from 'src/app/log/actions';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css'],
})
export class LanguagesComponent implements OnInit {
  public user: User = new User();
  public currentUser: User = new User();
  public language: Language = new Language();
  public id: number;

  public level: FormControl;
  public languageName: FormControl;
  public endDate: FormControl;
  public languageForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private loginStore: Store<AppState>
  ) {
    /* this.userService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.user = Object.assign(this.user, x);
      this.id = +this.route.snapshot.paramMap.get('id');
      if (this.id) {
        this.language = this.user.getLanguage(this.id);
        console.log(this.language);
      }
    });*/
    this.id = +this.route.snapshot.paramMap.get('id');
    this.loginStore.select('loginApp').subscribe((loginResponse) => {
      this.currentUser = new User();
      this.currentUser = Object.assign(this.currentUser, loginResponse.login);
      this.language = new Language();
      if (this.id) {
        this.language = this.currentUser.getLanguage(this.id);
        console.log(this.language);
      }
    });
  }

  ngOnInit(): void {
    this.level = new FormControl(this.language.level, [Validators.required]);
    this.languageName = new FormControl(this.language.language, [
      Validators.required,
    ]);

    this.endDate = new FormControl(this.language.endDate, []);

    this.languageForm = this.formBuilder.group({
      level: this.level,
      languageName: this.languageName,
      endDate: this.endDate,
    });
  }

  public onSave() {
    console.log('submit');
    var language = new Language();
    language.level = this.level.value;
    language.language = this.languageName.value;
    language.endDate = this.endDate.value;
    this.user = new User();
    this.user = Object.assign(this.user, this.currentUser);

    if (this.id) {
      this.user.deleteLanguage(this.id);
    }
    this.user.addLanguage(language);

    if (!this.user) {
      return;
    }
    this.loginStore.dispatch(updateUser({ user: this.user }));
    this.router.navigate(['profile-page']);
  }
}
