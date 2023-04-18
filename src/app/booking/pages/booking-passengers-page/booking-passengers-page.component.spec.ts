import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPassengersPageComponent } from './booking-passengers-page.component';

describe('BookingPassengersPageComponent', () => {
  let component: BookingPassengersPageComponent;
  let fixture: ComponentFixture<BookingPassengersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingPassengersPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingPassengersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
