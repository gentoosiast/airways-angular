import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginData } from '@core/types/login';
import { User } from '@core/types/user';

@Component({
  selector: 'air-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() private formSubmit = new EventEmitter<LoginData>();
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onFacebookButtonClick(data: User) {
    this.setFormData(data);
  }

  onGoogleButtonClick(data: User) {
    this.setFormData(data);
  }

  onSubmit() {
    if (!this.email?.value || !this.password?.value) {
      return;
    }

    this.formSubmit.emit({ email: this.email.value, password: this.password.value });
  }

  private setFormData(data: User) {
    this.loginForm.patchValue({
      ...data,
    });
  }
}
