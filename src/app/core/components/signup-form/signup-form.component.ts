import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiCountryIsoCode, TUI_ENGLISH_LANGUAGE_COUNTRIES } from '@taiga-ui/i18n';
import { Gender, SocialData } from '@core/interfaces/social-data';
import { MINIMUM_PASSWORD_LENGTH } from '@core/constants';

@Component({
  selector: 'air-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  @Output() private formSubmit = new EventEmitter();
  countries = Object.values(TuiCountryIsoCode);
  countryIsoCode = TuiCountryIsoCode.US;
  countryNames = this.countries.map((country) => TUI_ENGLISH_LANGUAGE_COUNTRIES[country]);
  minAllowedDate = new TuiDay(1900, 0, 1);
  maxAllowedDate = TuiDay.currentLocal();
  minPasswordLength = MINIMUM_PASSWORD_LENGTH;
  signupForm = new FormGroup({
    email: new FormControl<string | null>('', [Validators.required, Validators.email]),
    password: new FormControl<string | null>('', [Validators.required, Validators.minLength(MINIMUM_PASSWORD_LENGTH)]),
    firstName: new FormControl<string | null>('', Validators.required),
    lastName: new FormControl<string | null>('' as string | null, Validators.required),
    birthDate: new FormControl<TuiDay | null>(null, Validators.required),
    gender: new FormControl<Gender | null>('male', Validators.required),
    phone: new FormControl<string | null>('', Validators.required),
    citizenship: new FormControl<string | null>(null, Validators.required),
    hasAcceptedTOS: new FormControl<boolean | null>(false, Validators.requiredTrue),
  });

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get birthDate() {
    return this.signupForm.get('birthDate');
  }

  get phone() {
    return this.signupForm.get('phone');
  }

  get citizenship() {
    return this.signupForm.get('citizenship');
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
    this.signupForm.patchValue({
      ...data,
    });
  }
}
