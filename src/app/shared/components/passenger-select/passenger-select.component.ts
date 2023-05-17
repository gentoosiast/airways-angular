import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import plur from 'plur';
import { PassengerCategory, Passengers } from '@shared/types/passengers';

@Component({
  selector: 'air-passenger-select',
  templateUrl: './passenger-select.component.html',
  styleUrls: ['./passenger-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PassengerSelectComponent),
      multi: true,
    },
  ],
})
export class PassengerSelectComponent implements ControlValueAccessor {
  formControl: FormControl<Passengers | null> = new FormControl({ adults: 1, children: 0, infants: 0 });
  passengerItems: { category: PassengerCategory; description: string }[] = [
    { category: 'adults', description: '14+ years' },
    { category: 'children', description: '2-14 years' },
    { category: 'infants', description: '0-2 years' },
  ];
  private isDisabled = false;
  private isTouched = false;
  private onChange: null | ((value: Passengers) => void) = null;
  private onTouched: null | (() => void) = null;

  get passengers(): Passengers | null {
    return this.formControl.value;
  }

  get invalid(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  registerOnChange(fn: (value: Passengers) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  writeValue(value: Passengers): void {
    this.formControl.setValue(value);
  }

  modifyPassengers(type: PassengerCategory, delta: number): void {
    this.markAsTouched();

    if (!this.isDisabled) {
      const value = this.formControl.value;

      if (!value) {
        return;
      }

      const passengers = { ...value };

      passengers[type] += delta;
      if (passengers[type] < 0) {
        passengers[type] = 0;
      }

      this.formControl.setValue(passengers);

      if (this.onChange) {
        this.onChange(passengers);
      }
    }
  }

  onFocusChange(): void {
    this.markAsTouched();
  }

  stringifyPassengers(passengers: Passengers): string {
    return `${passengers.adults} ${plur('Adult', passengers.adults)}, ${passengers.children} ${plur(
      'Child',
      passengers.children,
    )}, ${passengers.infants} ${plur('Infant', passengers.infants)}`;
  }

  private markAsTouched(): void {
    if (!this.isDisabled && !this.isTouched && this.onTouched) {
      this.isTouched = true;
      this.onTouched();
    }
  }
}
