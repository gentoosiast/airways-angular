import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule } from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { PassengersDataPipe } from './pipes/passengers-data.pipe';
import { FlightsDatesPipe } from './pipes/flights-dates.pipe';
import { PassengerSelectComponent } from './components/passenger-select/passenger-select.component';

@NgModule({
  declarations: [PassengersDataPipe, FlightsDatesPipe, PassengerSelectComponent],
  imports: [CommonModule, ReactiveFormsModule, TuiButtonModule, TuiDataListModule, TuiSelectModule],
  exports: [PassengersDataPipe, FlightsDatesPipe, PassengerSelectComponent],
})
export class SharedModule {}
