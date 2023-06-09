import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { filter, Observable, Subscription, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { TuiDialogService, TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { FlightSearchPopupComponent } from '../flight-search-popup/flight-search-popup.component';
import { TabbedFormsComponent } from '../tabbed-forms/tabbed-forms.component';
import { Currency, DateFormat } from '@core/types/user-settings';
import { selectUser } from '@store/selectors/user.selectors';
import { User } from '@core/types/user';
import { logoutUser } from '@store/actions/user.actions';
import { FlightSearchData } from '@shared/types/flight-data';
import { selectFlightSearchData } from '@store/selectors/flight-data.selectors';
import { saveUserSettings } from '@store/actions/user-settings.actions';
import { UserSettings } from '@shared/types/user-settings';
import { selectUserSettings } from '@store/selectors/user-settings.selectors';
import { selectCurrentBookings } from '@store/selectors/bookings.selector';

@Component({
  selector: 'air-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartBookings$ = this.store.select(selectCurrentBookings);
  currencies = Object.values(Currency);
  dateFormats = Object.values(DateFormat);
  flightSearchData$?: Observable<FlightSearchData | null>;
  showEditButton = false;
  showBookingDetails = false;
  userSettings$: Observable<UserSettings> = this.store.select(selectUserSettings);
  user$?: Observable<User | null>;

  userSettingsForm = new FormGroup({
    dateFormat: new FormControl<DateFormat | null>(null),
    currency: new FormControl<Currency | null>(null),
  });

  private sub = new Subscription();
  private userSettingsForm$ = this.userSettingsForm.valueChanges.pipe(
    tap(({ currency, dateFormat }) => {
      if (!currency || !dateFormat) {
        return;
      }
      this.store.dispatch(saveUserSettings({ userSettings: { currency, dateFormat } }));
    }),
  );
  private showProgressBar$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    tap(() => {
      this.showEditButton = '/booking/step-flights' === this.router.url;

      if (['/booking/step-flights', '/booking/step-passengers', '/booking/step-summary'].includes(this.router.url)) {
        this.showBookingDetails = true;
      } else {
        this.showBookingDetails = false;
      }
    }),
  );

  constructor(
    private dialogs: TuiDialogService,
    private alertService: TuiAlertService,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.sub.add(this.showProgressBar$.subscribe());
    this.sub.add(this.userSettingsForm$.subscribe());
    this.sub.add(
      this.userSettings$.pipe(take(1)).subscribe((userSettings) => this.userSettingsForm.setValue(userSettings)),
    );
    this.flightSearchData$ = this.store.select(selectFlightSearchData);
    this.user$ = this.store.select(selectUser);
  }

  getDateFormatForPipe(dateFormat: DateFormat): string {
    switch (dateFormat) {
      case DateFormat.MM_DD_YYYY:
        return 'LLL d';
      case DateFormat.DD_MM_YYYY:
        return 'd LLL';
      case DateFormat.YYYY_MM_DD:
        return 'LLL d';
      default:
        return 'd LLL';
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout(): void {
    this.store.dispatch(logoutUser());
  }

  openFlightSearchModal(): void {
    this.sub.add(this.dialogs.open<boolean>(new PolymorpheusComponent(FlightSearchPopupComponent)).subscribe());
  }

  openLoginModal(): void {
    this.sub.add(
      this.dialogs.open<string>(new PolymorpheusComponent(TabbedFormsComponent)).subscribe({
        next: (message) => {
          this.sub.add(this.alertService.open(message, { status: TuiNotification.Success }).subscribe());
        },
      }),
    );
  }

  stringify(item: DateFormat): string {
    return item.toUpperCase();
  }
}
