import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule } from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { PassengersDataPipe } from './pipes/passengers-data.pipe';
import { PassengerSelectComponent } from './components/passenger-select/passenger-select.component';

@NgModule({
  declarations: [PassengersDataPipe, PassengerSelectComponent],
  imports: [CommonModule, ReactiveFormsModule, TuiButtonModule, TuiDataListModule, TuiSelectModule],
  exports: [PassengersDataPipe, PassengerSelectComponent],
})
export class SharedModule {}
