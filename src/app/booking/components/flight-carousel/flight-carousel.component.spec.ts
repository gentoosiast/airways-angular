import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCarouselComponent } from './flight-carousel.component';

describe('FlightCarouselComponent', () => {
  let component: FlightCarouselComponent;
  let fixture: ComponentFixture<FlightCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
