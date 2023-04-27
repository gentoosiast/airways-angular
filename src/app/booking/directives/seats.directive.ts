import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

const ALMOST_FULL_SEATS_THRESHOLD = 10;

type PlaneSeatsCSSClasses = 'seats-almost-full' | 'seats-less-than-half' | 'seats-more-than-half';

@Directive({
  selector: '[airSeats]',
})
export class SeatsDirective implements OnInit {
  @Input() airSeats?: [number, number]; // [seats, availableSeats]

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setSeatsClass();
  }

  private addSeatsClass(className: PlaneSeatsCSSClasses): void {
    this.renderer.addClass(this.el.nativeElement, className);
  }

  private setSeatsClass(): void {
    if (!this.airSeats) {
      return;
    }

    if (this.airSeats[1] < ALMOST_FULL_SEATS_THRESHOLD) {
      this.addSeatsClass('seats-almost-full');
    } else if (this.airSeats[0] / (this.airSeats[0] - this.airSeats[1]) < 2) {
      this.addSeatsClass('seats-less-than-half');
    } else {
      this.addSeatsClass('seats-more-than-half');
    }
  }
}
