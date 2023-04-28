import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { map, startWith, Subscription } from 'rxjs';
import { UserSettingsService } from '@core/services/user-settings.service';
import { Currency, DateFormat } from '@core/constants/user-settings.constant';

@Component({
  selector: 'air-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  showProgressBar = false;
  dateFormats = Object.values(DateFormat);
  currencies = Object.values(Currency);

  userSettingsForm = new FormGroup({
    dateFormat: new FormControl(this.dateFormats[0]),
    currency: new FormControl(this.currencies[0]),
  });

  private sub = new Subscription();
  private userSettings$ = this.userSettingsForm.valueChanges.pipe(
    startWith(this.userSettingsForm.value),
    map((value) => this.userSettingsService.setUserSettings(value)),
  );
  private showProgressBar$ = this.router.events.pipe(
    map((value) => {
      if (!(value instanceof NavigationEnd)) return;
      if (['/booking/step-flights', '/booking/step-passengers', '/booking/step-summary'].includes(this.router.url)) {
        this.showProgressBar = true;
      } else {
        this.showProgressBar = false;
      }
    }),
  );

  constructor(private router: Router, private userSettingsService: UserSettingsService) {}

  ngOnInit(): void {
    this.sub.add(this.showProgressBar$.subscribe());
    this.sub.add(this.userSettings$.subscribe());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
