import { UserSettingsService } from '@core/services/user-settings.service';
import { DateFormat } from '@core/types/user-settings';

export const taigaDateFormat = (userSettingsService: UserSettingsService) => {
  console.log('taigaDateFormat runs');
  const { dateFormat } = userSettingsService.load() ?? { dateFormat: DateFormat.DD_MM_YYYY };

  switch (dateFormat) {
    case DateFormat.DD_MM_YYYY:
      return 'DMY';
    case DateFormat.MM_DD_YYYY:
      return 'MDY';
    case DateFormat.YYYY_MM_DD:
      return 'YMD';
    default:
      return 'DMY';
  }
};
