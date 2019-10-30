import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AuthenticationService, UserService } from '../_services/index';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // register a fake user for test
    this.userService.delete(1).subscribe(() => {});
    const fake_user_model = {id: 1, email: 'someone@example.com', password: 'password', firstName: 'Some', lastName: 'One'};
    this.userService.create(fake_user_model)
      .subscribe(
        data => {
        },
        error => {
          this.loading = false;
      });

    // get return url from route parameters or default to '/'
    this.returnUrl = '/search';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password)
      .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
  }
}
