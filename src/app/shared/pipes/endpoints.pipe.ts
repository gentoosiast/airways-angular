import { Pipe, PipeTransform } from '@angular/core';
import { FligthsData } from '@shared/models/booking-data.model';

@Pipe({
  name: 'endpoints',
})
export class EndpointsPipe implements PipeTransform {
  transform(fligthsData: FligthsData[]): string {
    return fligthsData.map((value) => `<div>${value.departure} - ${value.arrival}</div>`).join('');
  }
}
