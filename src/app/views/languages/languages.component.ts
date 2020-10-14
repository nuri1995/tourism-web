import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoSpaces } from 'src/app/shared/directives/no-spaces.validator';
import { Language } from 'src/app/shared/models/language';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

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
    private router: Router
  ) {
    this.userService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.user = Object.assign(this.user, x);
      this.id = +this.route.snapshot.paramMap.get('id');
      if (this.id) {
        this.language = this.user.getLanguage(this.id);
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

    this.language.level = this.level.value;
    this.language.language = this.languageName.value;
    this.language.endDate = this.endDate.value;

    if (this.id) {
      this.user.languages[this.id - 1] = this.language;
    } else {
      this.user.addLanguage(this.language);
    }
    this.currentUser.languages = this.user.languages;

    if (!this.currentUser) {
      return;
    }
    console.log(this.currentUser);
    this.userService.updateUser(this.currentUser).subscribe((user) => {
      console.log(user);
      this.router.navigate(['profile-page']);
    });
  }
}
