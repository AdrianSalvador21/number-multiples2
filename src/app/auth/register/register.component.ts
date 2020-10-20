import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/auth';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  registerForm!: FormGroup;
  isLoading = false;
  loginImg = '/assets/images/public/branding/logo-adrian.svg';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notification: NotificationsService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  register() {
    if (this.registerForm.value.password !== this.registerForm.value.password2) {
      this.notification.error('Error: ', 'Invalid confirm password', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10,
      });
      return;
    }
    this.authenticationService
      .register(this.registerForm.value)
      .then((result) => {
        this.notification.success('OK', 'You were successfully registered. Sign in', {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 10,
        });
        this.router.navigateByUrl('/login');
      })
      .catch((error) => {
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
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }
}
