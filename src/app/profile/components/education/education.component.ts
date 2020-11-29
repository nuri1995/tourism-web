import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoSpaces } from 'src/app/shared/directives/no-spaces.validator';
import { Education } from 'src/app/profile/models/education';
import { User } from 'src/app/log/models/user';
import { UserService } from 'src/app/log/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { updateUser } from 'src/app/log/actions';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  public user: User = new User();
  public currentUser: User = new User();
  public education: Education = new Education();
  public id: number;

  public type: FormControl;
  public level: FormControl;
  public name: FormControl;
  public university: FormControl;
  public endDate: FormControl;
  public educationForm: FormGroup;
  public levelDrop: string[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private loginStore: Store<AppState>
  ) {
    /*this.userService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.user = Object.assign(this.user, x);
      this.id = +this.route.snapshot.paramMap.get('id');
      if (this.id) {
        this.education = this.user.getEducation(this.id);
        console.log(this.education);

        if (this.education.type === 'Universidad') {
          this.levelDrop = [
            'Grado',
            'Diplomado',
            'Licenciado',
            'Ingeniero',
            'Máster',
            'Doctorado',
            'Postgrado',
          ];
        } else if (this.education.type === 'Ciclo Formativo') {
          this.levelDrop = ['Grado Superior', 'Grado Medio'];
        }
      }
    });*/

    this.id = +this.route.snapshot.paramMap.get('id');
    this.loginStore.select('loginApp').subscribe((loginResponse) => {
      this.currentUser = new User();
      this.currentUser = Object.assign(this.currentUser, loginResponse.login);
      this.education = new Education();
      if (this.id) {
        this.education = this.currentUser.getEducation(this.id);
        console.log(this.education);
        if (this.education.type === 'Universidad') {
          this.levelDrop = [
            'Grado',
            'Diplomado',
            'Licenciado',
            'Ingeniero',
            'Máster',
            'Doctorado',
            'Postgrado',
          ];
        } else if (this.education.type === 'Ciclo Formativo') {
          this.levelDrop = ['Grado Superior', 'Grado Medio'];
        }
      }
    });
  }

  ngOnInit(): void {
    this.name = new FormControl(this.education.name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
      NoSpaces.noSpaces(),
    ]);
    this.type = new FormControl(this.education.type, [Validators.required]);
    this.level = new FormControl('', [Validators.required]);

    this.university = new FormControl(this.education.university, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
    ]);
    this.endDate = new FormControl(this.education.endDate, []);

    this.educationForm = this.formBuilder.group(
      {
        type: this.type,
        level: this.level,
        name: this.name,
        university: this.university,
        endDate: this.endDate,
      },
      {}
    );
    this.educationForm.controls['level'].setValue(this.education.level, {
      onlySelf: true,
    });
  }

  changeType(e) {
    console.log(e.target.value);
    if (e.target.value === 'Universidad') {
      this.levelDrop = [
        'Grado',
        'Diplomado',
        'Licenciado',
        'Ingeniero',
        'Máster',
        'Doctorado',
        'Postgrado',
      ];
    } else if (e.target.value === 'Ciclo Formativo') {
      this.levelDrop = ['Grado Superior', 'Grado Medio'];
    }
  }
  public onSave() {
    console.log('submit');
    var education = new Education();
    education.type = this.type.value;
    education.level = this.level.value;
    education.name = this.name.value;
    education.university = this.university.value;
    education.endDate = this.endDate.value;

    this.user = new User();
    this.user = Object.assign(this.user, this.currentUser);

    if (this.id) {
      this.user.deleteEducation(this.id);
    }
    this.user.addEducation(education);

    if (!this.user) {
      return;
    }
    this.loginStore.dispatch(updateUser({ user: this.user }));
    this.router.navigate(['profile-page']);
  }
}
