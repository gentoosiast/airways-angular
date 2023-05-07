import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiDataListModule, TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiRadioLabeledModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { FlightSearchRoutingModule } from './flight-search-routing.module';
import { FlightSearchPageComponent } from './pages/flight-search-page/flight-search-page.component';

@NgModule({
  declarations: [FlightSearchPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiLetModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiErrorModule,
    TuiTextfieldControllerModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiInputModule,
    TuiInputDateModule,
    TuiInputDateRangeModule,
    TuiRadioLabeledModule,
    TuiSelectModule,
    FlightSearchRoutingModule,
  ],
})
export class FlightSearchModule {}
