import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

const enum BookingSteps {
  STEP_FLIGHTS = 0,
  STEP_PASSENGERS = 1,
  STEP_SUMMARY = 2,
}

@Component({
  selector: 'air-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  bookingStep: BookingSteps = this.getBookingStepFromUrl();

  constructor(private router: Router) {
    this.router.events.subscribe((value) => {
      if (!(value instanceof NavigationEnd)) return;
      this.bookingStep = this.getBookingStepFromUrl();
    });
  }

  iconForFlightsStep() {
    if (this.bookingStep === BookingSteps.STEP_FLIGHTS) return 'tuiIconEdit3';
    else return 'tuiIconCheck';
  }

  iconForPassengersStep() {
    if (this.bookingStep === BookingSteps.STEP_PASSENGERS) return 'tuiIconEdit3';
    if (this.bookingStep > BookingSteps.STEP_PASSENGERS) return 'tuiIconCheck';
    else return '';
  }

  modeForPassengersStepIcon() {
    if (this.bookingStep >= BookingSteps.STEP_PASSENGERS) return 'primary';
    else return 'white';
  }

  iconForSummaryStep() {
    if (this.bookingStep === BookingSteps.STEP_SUMMARY) return 'tuiIconEdit3';
    if (this.bookingStep > BookingSteps.STEP_PASSENGERS) return 'tuiIconCheck';
    else return '';
  }

  modeForSummaryStepIcon() {
    if (this.bookingStep >= BookingSteps.STEP_SUMMARY) return 'primary';
    else return 'white';
  }

  private getBookingStepFromUrl() {
    switch (this.router.url) {
      case '/booking/step-flights':
        return BookingSteps.STEP_FLIGHTS;
      case '/booking/step-passengers':
        return BookingSteps.STEP_PASSENGERS;
      case '/booking/step-summary':
        return BookingSteps.STEP_SUMMARY;
      default:
        return BookingSteps.STEP_FLIGHTS;
    }
  }
}
