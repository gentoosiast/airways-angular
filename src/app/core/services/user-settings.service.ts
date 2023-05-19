import { Injectable } from '@angular/core';
import { UserSettings } from '@shared/types/user-settings';
import { LocalStorageService } from './local-storage.service';
import { STORAGE_USER_SETTINGS_KEY } from '@shared/constants/storage.constants';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  constructor(private localStorageService: LocalStorageService) {}

  load(): UserSettings | null {
    return this.localStorageService.get<UserSettings>(STORAGE_USER_SETTINGS_KEY);
  }

  save(settings: UserSettings): void {
    this.localStorageService.set<UserSettings>(STORAGE_USER_SETTINGS_KEY, settings);
  }
}
