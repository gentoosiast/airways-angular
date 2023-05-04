import { NgModule } from '@angular/core';
import { BookingRoutingModule } from './booking-routing.module';
import { CommonModule } from '@angular/common';
import { TuiSvgModule, TUI_SANITIZER, TuiButtonModule } from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { BookingSummaryPageComponent } from './pages/booking-summary-page/booking-summary-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BookingSummaryPageComponent],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
  ],
  imports: [CommonModule, BookingRoutingModule, TuiSvgModule, SharedModule, TuiButtonModule],
})
export class BookingModule {}
