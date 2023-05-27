import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { selectBookingFromPrevSteps } from '@store/selectors/bookings.selector';

export const bookingSummaryGuardFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectBookingFromPrevSteps).pipe(
    tap((booking) => {
      if (!booking) {
        router.navigateByUrl('/');
      }
    }),
  );
};
