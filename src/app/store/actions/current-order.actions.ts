import { createAction, props } from '@ngrx/store';
import { Booking } from '@shared/types/booking';

export const addBooking = createAction('[Booking] Add booking', props<{ booking: Booking }>());

export const removeBooking = createAction('[Booking] Remove booking', props<{ id: string }>());

export const checkoutBooking = createAction('[Booking] Checkout booking', props<{ id: string }>());

export const storeCurrentBookingId = createAction('[Booking] Store current booking id', props<{ id: string | null }>());

export const prefillBookingData = createAction('[Booking] Prefill booking data', props<{ booking: Booking }>());

export const clearBookingData = createAction('[Booking] Clear booking data');
