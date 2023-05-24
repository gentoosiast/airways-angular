import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '@shared/types/flight';

@Pipe({
  name: 'flightsDates',
})
export class FlightsDatesPipe implements PipeTransform {
  transform(flight: Flight): string {
    const departureDate = new Date(flight.departureDate);
    const arrivalDate = new Date(flight.arrivalDate);

    return departureDate.setHours(0, 0, 0, 0) === arrivalDate.setHours(0, 0, 0, 0)
      ? `${departureDate.toLocaleDateString()}, ${this.formatTime(departureDate)} - ${this.formatTime(arrivalDate)}`
      : `${departureDate.toLocaleDateString()}, ${this.formatTime(
          departureDate,
        )} - ${arrivalDate.toLocaleDateString()}, ${this.formatTime(arrivalDate)}`;

    //   return flightsData.departureDate.date.daySame(flightsData.arrivalDate.date)
    //     ? `${flightsData.departureDate.date.getFormattedDay('DMY', '/')}, ${flightsData.departureDate.time} - ${
    //         flightsData.arrivalDate.time
    //       }`
    //     : `${flightsData.departureDate.date.getFormattedDay('DMY', '/')}, ${
    //         flightsData.departureDate.time
    //       } - ${flightsData.arrivalDate.date.getFormattedDay('DMY', '/')}, ${flightsData.arrivalDate.time}`;
  }

  private formatTime(date: Date) {
    return `${date.getHours()}:${date.getMinutes()}`;
  }
}
