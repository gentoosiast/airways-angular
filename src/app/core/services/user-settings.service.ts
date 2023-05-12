import { Injectable } from '@angular/core';
import { Currency, DateFormat } from '@core/types/user-settings';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  dateFormat: DateFormat = DateFormat.MM_DD_YYYY;
  currency: Currency = Currency.Ruble;

  setUserSettings(value: { dateFormat?: DateFormat | null; currency?: Currency | null }) {
    this.dateFormat = value.dateFormat || this.dateFormat;
    this.currency = value.currency || this.currency;
    // TODO: maybe save to local storage
  }
}
