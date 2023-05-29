import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanReadableTime',
})
export class HumanReadableTimePipe implements PipeTransform {
  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes - hours * 60;

    return `${hours}h ${mins.toString().padStart(2, '0')}m`;
  }
}
