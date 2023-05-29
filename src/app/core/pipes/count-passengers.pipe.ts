import { Pipe, PipeTransform } from '@angular/core';
import { Passengers } from '@shared/types/passengers';

@Pipe({
  name: 'countPassengers',
})
export class CountPassengersPipe implements PipeTransform {
  transform(passengers: Passengers): number {
    return Object.values(passengers).reduce((acc, val) => acc + val, 0);
  }
}
