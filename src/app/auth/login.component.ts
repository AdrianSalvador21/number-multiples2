import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';
import { CredentialsService } from '@app/auth/credentials.service';
import { NotificationsService } from 'angular2-notifications';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  loginImg = '/assets/images/public/branding/logo-adrian.svg';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notification: NotificationsService,
    private credentialsService: CredentialsService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    this.authenticationService
      .login(this.loginForm.value)
      .then((result) => {
        const data = {
          username: this.loginForm.value.username,
          token: result.user.uid,
        };
        this.credentialsService.setCredentials(data, this.loginForm.value.remember);
        this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
      })
      .catch((error) => {
        this.isLoading = false;
        this.notification.error('Error: ', error.message, {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 10,
        });
      });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
