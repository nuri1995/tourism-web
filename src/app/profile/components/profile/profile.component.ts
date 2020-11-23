import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CheckNif } from 'src/app/shared/directives/check-nif.validator';
import { NoSpaces } from 'src/app/shared/directives/no-spaces.validator';
import { User } from 'src/app/log/models/user';
import { UserService } from 'src/app/log/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { updateUser } from 'src/app/log/actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user: User = new User();
  public currentUser: User = new User();

  public name: FormControl;
  public surname: FormControl;
  public birthdate: FormControl;
  public phone: FormControl;
  public nationality: FormControl;
  public nif: FormControl;
  public about: FormControl;
  public companyName: FormControl;
  public companyDescription: FormControl;
  public cif: FormControl;
  public profileCompanyForm: FormGroup;
  public profileTouristForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private loginStore: Store<AppState>,
    private router: Router
  ) {
    /*
    this.userService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.user = Object.assign(this.user, x);
    });*/
    this.loginStore.select('loginApp').subscribe((loginResponse) => {
      this.currentUser = loginResponse.login;
      this.user = new User();
      this.user = Object.assign(this.user, loginResponse.login);
      console.log(this.currentUser);
    });
  }

  ngOnInit(): void {
    this.name = new FormControl(this.currentUser.name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
      NoSpaces.noSpaces(),
    ]);
    this.surname = new FormControl(this.currentUser.surname, [
      Validators.minLength(3),
      Validators.maxLength(55),
    ]);
    this.birthdate = new FormControl(this.currentUser.birthdate, []);
    this.phone = new FormControl(this.currentUser.phone, []);
    this.nationality = new FormControl(this.currentUser.nationality, []);
    this.nif = new FormControl(this.currentUser.nif, []);
    this.about = new FormControl(this.currentUser.about, []);
    this.companyName = new FormControl(this.currentUser.companyName, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
      NoSpaces.noSpaces(),
    ]);
    this.companyDescription = new FormControl(
      this.currentUser.companyDescription,
      []
    );
    this.cif = new FormControl(this.currentUser.cif, []);

    this.profileCompanyForm = this.formBuilder.group(
      {
        name: this.name,
        surname: this.surname,
        birthdate: this.birthdate,
        phone: this.phone,
        nationality: this.nationality,
        nif: this.nif,
        about: this.about,
        companyName: this.companyName,
        companyDescription: this.companyDescription,
        cif: this.cif,
      },
      {
        validator: CheckNif('nationality', 'nif'),
      }
    );
    this.profileTouristForm = this.formBuilder.group(
      {
        name: this.name,
        surname: this.surname,
        birthdate: this.birthdate,
        phone: this.phone,
        nationality: this.nationality,
        nif: this.nif,
        about: this.about,
      },
      {
        validator: CheckNif('nationality', 'nif'),
      }
    );
  }

  public onSave() {
    /* this.currentUser.name = this.name.value;
    this.currentUser.surname = this.surname.value;
    this.currentUser.birthdate = this.birthdate.value;
    this.currentUser.phone = this.phone.value;
    this.currentUser.about = this.about.value;
    this.currentUser.nationality = this.nationality.value;
    this.currentUser.nif = this.nif.value;
    this.currentUser.companyName = this.companyName.value;
    this.currentUser.companyDescription = this.companyDescription.value;
    this.currentUser.cif = this.cif.value;
    if (!this.currentUser) {
      return;
    }
    this.userService.updateUser(this.currentUser).subscribe((user) => {
      console.log(user);
      this.router.navigate(['profile-page']);
    });*/
    this.user.name = this.name.value;
    this.user.surname = this.surname.value;
    this.user.birthdate = this.birthdate.value;
    this.user.phone = this.phone.value;
    this.user.about = this.about.value;
    this.user.nationality = this.nationality.value;
    this.user.nif = this.nif.value;
    this.user.companyName = this.companyName.value;
    this.user.companyDescription = this.companyDescription.value;
    this.user.cif = this.cif.value;

    if (!this.user) {
      return;
    }
    this.loginStore.dispatch(updateUser({ user: this.user }));
    this.router.navigate(['profile-page']);
  }
}
