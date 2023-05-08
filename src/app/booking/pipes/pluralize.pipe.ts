import { Pipe, PipeTransform } from '@angular/core';
import plur from 'plur';

@Pipe({
  name: 'pluralize',
})
export class PluralizePipe implements PipeTransform {
  transform(value: string, quantity: number): string {
    return plur(value, quantity);
  }
}
