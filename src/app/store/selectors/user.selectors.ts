import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../state.model';
import { appFeatureKey } from '../reducers/app.reducer';

export const selectFeature = createFeatureSelector<AppState>(appFeatureKey);

export const selectUser = createSelector(selectFeature, (state) => state.user);
