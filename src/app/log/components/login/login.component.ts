import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/log/models/user';
import { UserService } from 'src/app/log/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { login } from '../../actions/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User = new User();
  public email: FormControl;
  public password: FormControl;
  public loginForm: FormGroup;
  public message: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private loginStore: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'),
    ]);
    this.password = new FormControl('', [Validators.required]);
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });

    this.loginStore.select('loginApp').subscribe((response) => {
      this.message = response.message;
    });
  }

  public login() {
    this.user.email = this.email.value;
    this.user.password = this.password.value;

    if (!this.user) {
      return;
    }

    this.loginStore.dispatch(login({ user: this.user }));

    /*
    this.userService
      .login(this.user.email, this.user.password)
      .subscribe((user) => {
        if (user) {
          this.router.navigate(['/']);
          console.log(this.user);
        } else {
          this.message = 'Username or password is incorrect';
        }
      });
      */
  }
}
