import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFlightsPageComponent } from './booking-flights-page.component';

describe('BookingFlightsPageComponent', () => {
  let component: BookingFlightsPageComponent;
  let fixture: ComponentFixture<BookingFlightsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingFlightsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingFlightsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
