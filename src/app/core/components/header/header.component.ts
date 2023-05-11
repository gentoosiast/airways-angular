import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { filter, startWith, Subscription, tap } from 'rxjs';
import { TuiDialogService, TuiAlertService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TabbedFormsComponent } from '../tabbed-forms/tabbed-forms.component';
import { UserSettingsService } from '@core/services/user-settings.service';
import { Currency, DateFormat } from '@core/types/user-settings';

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
    tap((value) => this.userSettingsService.setUserSettings(value)),
  );
  private showProgressBar$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    tap(() => {
      if (['/booking/step-flights', '/booking/step-passengers', '/booking/step-summary'].includes(this.router.url)) {
        this.showProgressBar = true;
      } else {
        this.showProgressBar = false;
      }
    }),
  );

  constructor(
    private dialogs: TuiDialogService,
    private alertService: TuiAlertService,
    private router: Router,
    private userSettingsService: UserSettingsService,
  ) {}

  ngOnInit(): void {
    this.sub.add(this.showProgressBar$.subscribe());
    this.sub.add(this.userSettings$.subscribe());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openLoginModal() {
    this.sub.add(
      this.dialogs.open<boolean>(new PolymorpheusComponent(TabbedFormsComponent)).subscribe({
        next: () => {
          this.sub.add(this.alertService.open('Form has been submitted').subscribe());
        },
      }),
    );
  }
}
