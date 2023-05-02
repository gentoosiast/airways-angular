import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengersDataPipe } from './pipes/passengers-data.pipe';
import { FlightsDatesPipe } from './pipes/flights-dates.pipe';

@NgModule({
  declarations: [PassengersDataPipe, FlightsDatesPipe],
  imports: [CommonModule],
  exports: [PassengersDataPipe, FlightsDatesPipe],
})
export class SharedModule {}
