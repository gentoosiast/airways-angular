import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Passengers } from '@shared/interfaces/passengers';

export const adultValidator = (ac: AbstractControl): ValidationErrors | null => {
  const passengers: Passengers = ac.value;

  if (passengers.adults === 0) {
    return { adultValidator: 'There should be at least one adult' };
  }

  return null;
};
