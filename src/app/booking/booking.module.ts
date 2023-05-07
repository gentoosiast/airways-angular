import { NgModule } from '@angular/core';
import { BookingRoutingModule } from './booking-routing.module';
import { CommonModule } from '@angular/common';
import { TuiSvgModule, TuiButtonModule } from '@taiga-ui/core';
import { BookingSummaryPageComponent } from './pages/booking-summary-page/booking-summary-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BookingSummaryPageComponent],
  imports: [CommonModule, BookingRoutingModule, TuiSvgModule, SharedModule, TuiButtonModule],
})
export class BookingModule {}
