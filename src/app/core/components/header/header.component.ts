import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { UserSettingsService } from '@core/services/user-settings.service';

@Component({
  selector: 'air-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showProgressBar = false;

  userSettingsForm = new FormGroup({
    dateFormat: new FormControl('MM/DD/YYYY'),
    currency: new FormControl('USD'),
  });

  userSettings$ = this.userSettingsForm.valueChanges
    .pipe(startWith(this.userSettingsForm.value))
    .subscribe((value) => this.userSettingsService.saveUserSettings(value));

  dateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/DD/MM', 'YYYY/MM/DD'];
  currencies = ['USD', 'EUR', 'CHF', 'RUB'];

  constructor(private router: Router, private userSettingsService: UserSettingsService) {
    this.router.events.subscribe((value) => {
      if (!(value instanceof NavigationEnd)) return;
      if (['/booking/step-flights', '/booking/step-passengers', '/booking/step-summary'].includes(this.router.url)) {
        this.showProgressBar = true;
      } else {
        this.showProgressBar = false;
      }
    });
  }
}
