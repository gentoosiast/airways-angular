import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  saveUserSettings(value: { dateFormat?: string | null; currency?: string | null }) {
    console.log(`${value.currency} ${value.dateFormat}`);
  }
}
