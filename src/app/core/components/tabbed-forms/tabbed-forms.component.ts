import { Component, Inject, OnDestroy } from '@angular/core';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Store } from '@ngrx/store';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiAlertService, TuiDialogContext, TuiNotification } from '@taiga-ui/core';
import { LoginData, SignupData } from '@core/types/login-signup';
import { AuthService } from '@core/services/auth.service';
import { saveUser } from '@store/actions/user.actions';
import { ALERT_DISPLAY_DURATION } from '@core/constants/alerts.constants';

@Component({
  selector: 'air-tabbed-forms',
  templateUrl: './tabbed-forms.component.html',
  styleUrls: ['./tabbed-forms.component.scss'],
})
export class TabbedFormsComponent implements OnDestroy {
  activeTabIdx = 0;
  private sub = new Subscription();

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private context: TuiDialogContext<string>,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private authService: AuthService,
    private store: Store,
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onLoginFormSubmit(loginData: LoginData) {
    this.authService
      .login(loginData)
      .pipe(
        catchError((err) => {
          this.showErrorAlert(err.message);

          return EMPTY;
        }),
      )
      .subscribe((user) => {
        this.store.dispatch(saveUser(user));

        this.ok('User logged in successfully...');
      });
  }

  onSignupFormSubmit(signupData: SignupData) {
    this.authService
      .signup(signupData)
      .pipe(
        catchError((err) => {
          this.showErrorAlert(err.message);

          return EMPTY;
        }),
      )
      .subscribe((user) => {
        this.store.dispatch(saveUser(user));

        this.ok('User was successfully registered...');
      });
  }

  private ok(message: string) {
    this.context.completeWith(message);
  }

  private cancel() {
    this.context.completeWith('');
  }

  private showErrorAlert(message: string) {
    this.sub.add(
      this.alerts
        .open(message, {
          label: 'Request error',
          status: TuiNotification.Error,
          autoClose: ALERT_DISPLAY_DURATION,
        })
        .subscribe(),
    );
  }
}
