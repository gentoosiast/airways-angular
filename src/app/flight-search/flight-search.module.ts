import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchRoutingModule } from './flight-search-routing.module';
import { FlightSearchPageComponent } from './pages/flight-search-page/flight-search-page.component';

@NgModule({
  declarations: [FlightSearchPageComponent],
  imports: [CommonModule, FlightSearchRoutingModule],
})
export class FlightSearchModule {}
