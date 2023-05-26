import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { selectFlightSearchData } from '@store/selectors/flight-data.selectors';

export const bookingFlightsGuardFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectFlightSearchData).pipe(
    tap((flightSearchData) => {
      if (!flightSearchData) {
        router.navigateByUrl('/');
      }
    }),
  );
};
