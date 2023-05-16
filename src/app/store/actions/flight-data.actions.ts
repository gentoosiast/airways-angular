import { createAction, props } from '@ngrx/store';
import { FlightSearchData } from '@shared/types/flight-data';
import { Flights } from '@shared/types/flights';

export const saveFlightSearch = createAction(
  '[FlightSearch] Save flight search',
  props<{ flightSearchData: FlightSearchData }>(),
);

export const saveFlights = createAction('[Flights] Save flights', props<{ flights: Flights }>());
