import { inject } from '@angular/core';
import { map, tap } from 'rxjs';
import * as AppActions from '../actions/app.actions';
import * as UserSettingsActions from '../actions/user-settings.actions';
import { UserSettingsService } from '@core/services/user-settings.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

export const loadUserSettingsEffect = createEffect(
  (actions$ = inject(Actions), userSettingsService = inject(UserSettingsService)) => {
    return actions$.pipe(
      ofType(AppActions.appLoaded, UserSettingsActions.loadUserSettings),
      map(() => {
        const userSettings = userSettingsService.load();

        if (userSettings) {
          return UserSettingsActions.loadUserSettingsSuccess({ userSettings });
        } else {
          return UserSettingsActions.loadUserSettingsFail();
        }
      }),
    );
  },
  { functional: true },
);

export const saveUserSettingsEffect = createEffect(
  (actions$ = inject(Actions), userSettingsService = inject(UserSettingsService)) => {
    return actions$.pipe(
      ofType(UserSettingsActions.saveUserSettings),
      tap(({ userSettings }) => {
        userSettingsService.save(userSettings);
      }),
    );
  },
  { functional: true, dispatch: false },
);
