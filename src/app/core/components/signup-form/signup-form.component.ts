import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { TUI_DATE_FORMAT, TuiDay } from '@taiga-ui/cdk';
import { TuiCountryIsoCode, TUI_ENGLISH_LANGUAGE_COUNTRIES } from '@taiga-ui/i18n';
import { User } from '@core/types/user';
import { Gender } from '@core/types/social-data';
import { SignupData } from '@core/types/login-signup';
import { MINIMUM_PASSWORD_LENGTH } from '@core/constants/signup.constants';
import { taigaDateFormat } from '@shared/factories/taiga-date-format.factory';
import { UserSettingsService } from '@core/services/user-settings.service';

@Component({
  selector: 'air-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  providers: [
    {
      provide: TUI_DATE_FORMAT,
      useFactory: taigaDateFormat,
      deps: [UserSettingsService],
    },
  ],
})
export class SignupFormComponent {
  @Output() private formSubmit = new EventEmitter<SignupData>();
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

  get gender() {
    return this.signupForm.get('gender');
  }

  get phone() {
    return this.signupForm.get('phone');
  }

  get citizenship() {
    return this.signupForm.get('citizenship');
  }

  onFacebookButtonClick(data: User) {
    this.setFormData(data);
  }

  onGoogleButtonClick(data: User) {
    this.setFormData(data);
  }

  onSubmit() {
    if (
      this.signupForm.invalid ||
      !this.email?.value ||
      !this.password?.value ||
      !this.firstName?.value ||
      !this.lastName?.value ||
      !this.birthDate?.value ||
      !this.gender?.value ||
      !this.phone?.value ||
      !this.citizenship?.value
    ) {
      return;
    }

    const signupData: SignupData = {
      email: this.email.value,
      password: this.password.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      birthDate: `${this.birthDate.value.toUtcNativeDate().toISOString()}`,
      gender: this.gender.value,
      phone: this.phone.value,
      citizenship: this.citizenship.value,
    };

    this.formSubmit.emit(signupData);
  }

  private setFormData(data: User) {
    this.signupForm.patchValue({
      ...data,
      birthDate: TuiDay.fromUtcNativeDate(new Date(data.birthDate)),
    });
  }
}
