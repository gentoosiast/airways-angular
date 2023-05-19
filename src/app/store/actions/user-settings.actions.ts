import { createAction, props } from '@ngrx/store';
import { UserSettings } from '@shared/types/user-settings';

export const loadUserSettings = createAction('[User Settings] Load user settings');
export const saveUserSettings = createAction(
  '[User Settings] Save user settings',
  props<{ userSettings: UserSettings }>(),
);
export const loadUserSettingsSuccess = createAction(
  '[User Settings] Load user settings SUCCESS',
  props<{ userSettings: UserSettings }>(),
);
export const loadUserSettingsFail = createAction('[User Settings] Load user settings FAIL');
