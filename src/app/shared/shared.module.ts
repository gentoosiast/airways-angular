import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsDatesPipe } from './pipes/flights-dates.pipe';

@NgModule({
  declarations: [FlightsDatesPipe],
  imports: [CommonModule],
  exports: [FlightsDatesPipe],
})
export class SharedModule {}
