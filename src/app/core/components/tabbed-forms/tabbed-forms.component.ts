import { Component, Inject, OnDestroy } from '@angular/core';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Store } from '@ngrx/store';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiAlertService, TuiDialogContext, TuiNotification } from '@taiga-ui/core';
import { LoginData } from '@core/interfaces/login-data';
import { AuthService } from '@core/services/auth.service';
import { loginUser } from 'src/app/store/actions/user.actions';
import { HttpErrorResponse } from '@angular/common/http';

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

  ok(message: string) {
    this.context.completeWith(message);
  }

  cancel() {
    this.context.completeWith('');
  }

  onLoginFormSubmit(loginData: LoginData) {
    this.authService
      .login(loginData)
      .pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            this.sub.add(
              this.alerts
                .open(`HTTP Error ${err.status}: ${err.error}`, { label: 'Login error', status: TuiNotification.Error })
                .subscribe(),
            );
          } else {
            this.sub.add(
              this.alerts
                .open(`HTTP Error ${err.status}: ${err.message}`, {
                  label: 'Login error',
                  status: TuiNotification.Error,
                })
                .subscribe(),
            );
          }

          return EMPTY;
        }),
      )
      .subscribe((user) => {
        this.store.dispatch(loginUser(user));

        this.ok('User logged in successfully...');
      });
  }

  onSignupFormSubmit() {
    this.ok('Registration success');
  }
}
