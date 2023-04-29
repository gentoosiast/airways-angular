import { Pipe, PipeTransform } from '@angular/core';
import { FligthsData } from '@shared/models/booking-data.model';

@Pipe({
  name: 'flightsDates',
})
export class FlightsDatesPipe implements PipeTransform {
  transform(fligthsData: FligthsData[]): string {
    return fligthsData
      .map((value) =>
        value.departureDate.date.daySame(value.arrivalDate.date)
          ? `<div>
      ${value.departureDate.date.getFormattedDay('DMY', '/')}, ${value.departureDate.time} - ${value.arrivalDate.time}
    </div>`
          : `<div>
      ${value.departureDate.date.getFormattedDay('DMY', '/')}, ${
              value.departureDate.time
            } - ${value.arrivalDate.date.getFormattedDay('DMY', '/')}, ${value.arrivalDate.time}
    </div>`,
      )
      .join('');
  }
}
