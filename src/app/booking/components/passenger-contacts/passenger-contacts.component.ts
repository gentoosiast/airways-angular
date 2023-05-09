import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';

@Component({
  selector: 'air-passenger-contacts',
  templateUrl: './passenger-contacts.component.html',
  styleUrls: ['./passenger-contacts.component.scss'],
})
export class PassengerContactsComponent implements OnInit {
  @Input() formGroupName!: string;
  contactForm!: FormGroup;
  countries = Object.values(TuiCountryIsoCode);
  countryIsoCode = TuiCountryIsoCode.US;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.contactForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

  get phone() {
    return this.contactForm.get('phone');
  }

  get email() {
    return this.contactForm.get('email');
  }
}
