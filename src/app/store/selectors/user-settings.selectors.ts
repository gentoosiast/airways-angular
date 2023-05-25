import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../state.model';
import { appFeatureKey } from '../reducers/app.reducer';

export const selectFeature = createFeatureSelector<AppState>(appFeatureKey);

export const selectUserSettings = createSelector(selectFeature, (state) => state.userSettings);
