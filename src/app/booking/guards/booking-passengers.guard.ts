import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { selectSelectedFlights } from '@store/selectors/flight-data.selectors';

export const bookingPassengersGuardFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectSelectedFlights).pipe(
    tap(({ flight }) => {
      if (!flight) {
        router.navigateByUrl('/');
      }
    }),
  );
};
