import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { filter, Observable, startWith, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { TuiDialogService, TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TabbedFormsComponent } from '../tabbed-forms/tabbed-forms.component';
import { UserSettingsService } from '@core/services/user-settings.service';
import { Currency, DateFormat } from '@core/types/user-settings';
import { selectUser } from 'src/app/store/selectors/user.selectors';
import { User } from '@core/types/user';
import { logoutUser } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'air-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currencies = Object.values(Currency);
  dateFormats = Object.values(DateFormat);
  showProgressBar = false;
  user$?: Observable<User | null>;

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
    private store: Store,
    private userSettingsService: UserSettingsService,
  ) {}

  ngOnInit(): void {
    this.sub.add(this.showProgressBar$.subscribe());
    this.sub.add(this.userSettings$.subscribe());
    this.user$ = this.store.select(selectUser);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout() {
    this.store.dispatch(logoutUser());
  }

  openLoginModal() {
    this.sub.add(
      this.dialogs.open<string>(new PolymorpheusComponent(TabbedFormsComponent)).subscribe({
        next: (message) => {
          this.sub.add(this.alertService.open(message, { status: TuiNotification.Success }).subscribe());
        },
      }),
    );
  }
}
