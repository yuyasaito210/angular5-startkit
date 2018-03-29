import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';


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
  private route: ActivatedRoute,
  private router: Router,
  private authenticationService: AuthenticationService,
  private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/images';
  }

  login() {
    this.loading = true;
    if (this.authenticationService.fake_signin(this.model.email, this.model.password)) {
      console.log(this.returnUrl);
      this.router.navigate([this.returnUrl]);
    } else {
      this.alertService.error("user email or password is incorrect");
      this.loading = false;
    }
  }
}
