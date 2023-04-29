import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengersDataPipe } from './pipes/passengers-data.pipe';
import { EndpointsPipe } from './pipes/endpoints.pipe';
import { FlightsDatesPipe } from './pipes/flights-dates.pipe';

@NgModule({
  declarations: [PassengersDataPipe, EndpointsPipe, FlightsDatesPipe],
  imports: [CommonModule],
  exports: [PassengersDataPipe, EndpointsPipe, FlightsDatesPipe],
})
export class SharedModule {}
