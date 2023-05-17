import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passengersData',
})
export class PassengersDataPipe implements PipeTransform {
  transform(passenger: 'adults' | 'children' | 'infants', count: number): string {
    if (!count) {
      return '';
    }
    if (passenger === 'adults') {
      return `${count} x Adult${count > 1 ? 's' : ''}`;
    }
    if (passenger === 'children') {
      return `${count} x Child${count > 1 ? 'ren' : ''}`;
    }
    if (passenger === 'infants') {
      return `${count} x Infant${count > 1 ? 's' : ''}`;
    }
    return '';
  }
}
