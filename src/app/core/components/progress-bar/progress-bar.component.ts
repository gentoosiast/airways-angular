import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';

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
export class ProgressBarComponent implements OnInit, OnDestroy {
  bookingStep: BookingSteps = this.getBookingStepFromUrl();
  private sub = new Subscription();
  private bookingStep$ = this.router.events.pipe(
    map((value) => {
      if (value instanceof NavigationEnd) {
        this.bookingStep = this.getBookingStepFromUrl();
      }
    }),
  );

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.sub.add(this.bookingStep$.subscribe());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  iconForFlightsStep() {
    return this.bookingStep === BookingSteps.STEP_FLIGHTS ? 'tuiIconEdit3' : 'tuiIconCheck';
  }

  iconForPassengersStep() {
    if (this.bookingStep === BookingSteps.STEP_PASSENGERS) {
      return 'tuiIconEdit3';
    }
    if (this.bookingStep > BookingSteps.STEP_PASSENGERS) {
      return 'tuiIconCheck';
    }
    return '';
  }

  modeForPassengersStepIcon() {
    return this.bookingStep >= BookingSteps.STEP_PASSENGERS ? 'primary' : 'link';
  }

  iconForSummaryStep() {
    return this.bookingStep === BookingSteps.STEP_SUMMARY ? 'tuiIconEdit3' : '';
  }

  modeForSummaryStepIcon() {
    return this.bookingStep >= BookingSteps.STEP_SUMMARY ? 'primary' : 'link';
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
