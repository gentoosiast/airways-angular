import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightConnections',
})
export class FlightConnectionsPipe implements PipeTransform {
  transform(connections: string[]): string {
    if (connections.length === 0) {
      return 'Direct';
    } else {
      return `Connected: ${connections.join(', ')}`;
    }
  }
}
