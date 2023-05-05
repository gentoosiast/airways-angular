import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import * as UserActions from '../actions/user.actions';

export const logoutEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(UserActions.logoutUser),
      tap(() => {
        authService.logout();
        router.navigateByUrl('/');
      }),
    );
  },
  { functional: true, dispatch: false },
);
