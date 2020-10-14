import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CheckPassword } from 'src/app/shared/directives/check-password.validator';
import { NoSpaces } from 'src/app/shared/directives/no-spaces.validator';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public users: User[];
  public user: User = new User();
  public message: string;
  public email: FormControl;
  public password: FormControl;
  public password2: FormControl;
  public name: FormControl;
  public surname: FormControl;
  public type: FormControl;
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]);
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
      NoSpaces.noSpaces(),
    ]);
    this.surname = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(55),
    ]);
    this.type = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.password2 = new FormControl('', [Validators.required]);
    this.registerForm = this.formBuilder.group(
      {
        email: this.email,
        password: this.password,
        password2: this.password2,
        name: this.name,
        surname: this.surname,
        type: this.type,
      },
      {
        validator: CheckPassword('password', 'password2'),
      }
    );
    this.getUsers();
  }

  public onSubmit() {
    this.user.name = this.name.value;
    this.user.surname = this.surname.value;

    this.user.type = this.type.value;
    this.user.email = this.email.value;
    this.user.password = this.password.value;

    if (!this.user) {
      return;
    }

    this.userService.checkEmail(this.user.email).subscribe((user) => {
      if (!user) {
        this.userService.registerUser(this.user as User).subscribe((user) => {
          this.users.push(user);
          this.router.navigate(['/login']);
        });
      } else {
        this.message = 'Email is already taken';
      }
    });
  }

  public getUsers() {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }
}
