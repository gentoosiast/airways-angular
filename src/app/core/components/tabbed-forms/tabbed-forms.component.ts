import { Component, Inject, OnDestroy } from '@angular/core';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { LoginData } from '@core/interfaces/login-data';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'air-tabbed-forms',
  templateUrl: './tabbed-forms.component.html',
  styleUrls: ['./tabbed-forms.component.scss'],
})
export class TabbedFormsComponent implements OnDestroy {
  activeTabIdx = 0;
  private sub = new Subscription();

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private context: TuiDialogContext<boolean>,
    private authService: AuthService,
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ok() {
    this.context.completeWith(true);
  }

  cancel() {
    this.context.completeWith(false);
  }

  onLoginFormSubmit(loginData: LoginData) {
    this.authService
      .login(loginData)
      .pipe(
        catchError((err) => {
          console.error(`error: ${JSON.stringify(err)}`);

          return EMPTY;
        }),
      )
      .subscribe((data) => console.log(`authData: ${JSON.stringify(data)}`));

    // this.ok();
  }

  onSignupFormSubmit() {
    this.ok();
  }
}
