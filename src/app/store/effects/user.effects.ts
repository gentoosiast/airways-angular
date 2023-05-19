import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import * as UserActions from '../actions/user.actions';
import * as AppActions from '../actions/app.actions';
import { User } from '@core/types/user';
import { STORAGE_USER_KEY } from '@shared/constants/storage.constants';

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

export const loadUserEffect = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)) => {
    return actions$.pipe(
      ofType(AppActions.appLoaded, UserActions.loadUser),
      map(() => {
        const user = localStorageService.get<User>(STORAGE_USER_KEY);

        if (user) {
          return UserActions.loadUserSuccess({ user });
        } else {
          return UserActions.loadUserFail();
        }
      }),
    );
  },
  { functional: true },
);

export const saveUserEffect = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)) => {
    return actions$.pipe(
      ofType(UserActions.saveUser),
      tap(({ user }) => {
        localStorageService.set<User>(STORAGE_USER_KEY, user);
      }),
    );
  },
  { functional: true, dispatch: false },
);
