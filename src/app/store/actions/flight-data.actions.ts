import { createAction, props } from '@ngrx/store';
import { FlightSearchData } from '@shared/types/flight-data';

export const saveFlightSearch = createAction(
  '[FlightSearch] Save flight search',
  props<{ flightSearchData: FlightSearchData }>(),
);
