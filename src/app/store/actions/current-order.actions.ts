import { createAction, props } from '@ngrx/store';
import { Booking } from '@shared/types/booking';

export const addBooking = createAction('[Booking] Add booking', props<{ booking: Booking }>());

export const removeBooking = createAction('[Booking] Remove booking', props<{ id: string }>());

export const editBooking = createAction('[Booking] Edit booking', props<{ id: string }>());

export const storeIdForDetails = createAction('[Booking] Store id for details', props<{ id: string | null }>());
