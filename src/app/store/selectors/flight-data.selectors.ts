import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../state.model';
import { appFeatureKey } from '../reducers/app.reducer';

export const selectFeature = createFeatureSelector<AppState>(appFeatureKey);

export const selectFlightSearchData = createSelector(selectFeature, (state) => state.flightSearchData);
export const selectFlights = createSelector(selectFeature, (state) => state.flights);
export const selectSelectedFlights = createSelector(selectFeature, (state) => state.selectedFlights);
export const selectPassengersInfo = createSelector(selectFeature, (state) => state.passengersInfo);
