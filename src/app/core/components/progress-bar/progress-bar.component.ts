import { Component } from '@angular/core';
import { /* NavigationEnd, */ Router } from '@angular/router';

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
  bookingStep: BookingSteps = 0;

  constructor(private router: Router) {
    this.router.events.subscribe((/* value */) => {
      // if (!(value instanceof NavigationEnd)) return;
      switch (this.router.url) {
        case '/booking/step-flights':
          this.bookingStep = BookingSteps.STEP_FLIGHTS;
          break;
        case '/booking/step-passengers':
          this.bookingStep = BookingSteps.STEP_PASSENGERS;
          break;
        case '/booking/step-summary':
          this.bookingStep = BookingSteps.STEP_SUMMARY;
          break;
        default:
          break;
      }
      console.log(this.bookingStep);
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
}
