import { createAction, props } from '@ngrx/store';
import { FlightSearchData } from '@shared/types/flight-data';
import { Flights } from '@shared/types/flights';
import { PassengersInfo } from '@shared/types/passengers';

export const saveFlightSearch = createAction(
  '[FlightSearch] Save flight search',
  props<{ flightSearchData: FlightSearchData }>(),
);

export const saveFlights = createAction('[Flights] Save flights', props<{ flights: Flights }>());

export const saveSelectedFlights = createAction(
  '[Flights] Save selected flights',
  props<{ flightIdx?: number; returnFlightIdx?: number }>(),
);

export const savePassengersInfo = createAction(
  '[Passengers] Save passengers info',
  props<{ passengersInfo: PassengersInfo }>(),
);
