import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

const CSS_CLASSES = ['seats-almost-full', 'seats-less-than-half', 'seats-more-than-half'] as const;
const ALMOST_FULL_SEATS_THRESHOLD = 10;

type PlaneSeatsCSSClasses = (typeof CSS_CLASSES)[number];

@Directive({
  selector: '[airSeats]',
})
export class SeatsDirective implements OnChanges {
  @Input() airSeats?: [number, number]; // [seats, availableSeats]

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    this.setSeatsClass();
  }

  private addSeatsClass(className: PlaneSeatsCSSClasses): void {
    this.renderer.addClass(this.el.nativeElement, className);
  }

  private removeSeatsClass(className: PlaneSeatsCSSClasses): void {
    this.renderer.removeClass(this.el.nativeElement, className);
  }

  private setSeatsClass(): void {
    if (!this.airSeats) {
      return;
    }

    CSS_CLASSES.forEach((cssClass) => this.removeSeatsClass(cssClass));

    if (this.airSeats[1] < ALMOST_FULL_SEATS_THRESHOLD) {
      this.addSeatsClass('seats-almost-full');
    } else if (this.airSeats[0] / (this.airSeats[0] - this.airSeats[1]) < 2) {
      this.addSeatsClass('seats-less-than-half');
    } else {
      this.addSeatsClass('seats-more-than-half');
    }
  }
}
