import { Pipe, PipeTransform } from '@angular/core';
import { FlightsData } from '@shared/types/booking';

@Pipe({
  name: 'flightsDates',
})
export class FlightsDatesPipe implements PipeTransform {
  transform(flightsData: FlightsData): string {
    return flightsData.departureDate.date.daySame(flightsData.arrivalDate.date)
      ? `${flightsData.departureDate.date.getFormattedDay('DMY', '/')}, ${flightsData.departureDate.time} - ${
          flightsData.arrivalDate.time
        }`
      : `${flightsData.departureDate.date.getFormattedDay('DMY', '/')}, ${
          flightsData.departureDate.time
        } - ${flightsData.arrivalDate.date.getFormattedDay('DMY', '/')}, ${flightsData.arrivalDate.time}`;
  }
}
