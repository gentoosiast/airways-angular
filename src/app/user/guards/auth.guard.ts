import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { selectUser } from '@store/selectors/user.selectors';

export const authGuardFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectUser).pipe(
    tap((user) => {
      if (!user) {
        router.navigateByUrl('/');
      }
    }),
  );
};
