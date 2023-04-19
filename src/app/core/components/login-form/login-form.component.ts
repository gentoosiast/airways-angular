import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SocialData } from '@core/interfaces/social-data';

@Component({
  selector: 'air-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() private formSubmit = new EventEmitter();
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

  onFacebookButtonClick(data: SocialData) {
    this.setFormData(data);
  }

  onGoogleButtonClick(data: SocialData) {
    this.setFormData(data);
  }

  onSubmit() {
    this.formSubmit.emit();
  }

  private setFormData(data: SocialData) {
    this.loginForm.patchValue({
      ...data,
    });
  }
}
