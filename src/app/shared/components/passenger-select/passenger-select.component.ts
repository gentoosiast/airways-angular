import { Component, Injector, OnDestroy, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
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
export class PassengerSelectComponent implements ControlValueAccessor, OnInit, OnDestroy {
  formControl!: FormControl<Passengers>;
  passengers: Passengers = { adults: 1, children: 0, infants: 0 };
  passengerItems: { category: PassengerCategory; description: string }[] = [
    { category: 'adults', description: '14+ years' },
    { category: 'children', description: '2-14 years' },
    { category: 'infants', description: '0-2 years' },
  ];
  private destroy$$: Subject<boolean> = new Subject<boolean>();
  private isDisabled = false;
  private isTouched = false;
  private onChange: null | ((value: Passengers) => void) = null;
  private onTouched: null | (() => void) = null;

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    this.setComponentControl();
  }

  ngOnDestroy(): void {
    this.destroy$$.next(true);
    this.destroy$$.unsubscribe();
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
    this.passengers = value;
  }

  modifyPassengers(type: PassengerCategory, delta: number) {
    this.markAsTouched();

    if (!this.isDisabled && this.passengers) {
      this.passengers[type] += delta;
      if (this.passengers[type] < 0) {
        this.passengers[type] = 0;
      }

      if (this.onChange) {
        this.onChange(this.passengers);
      }
    }
  }

  onFocusChange() {
    this.markAsTouched();
  }

  stringifyPassengers(passengers: Passengers): string {
    return `${passengers.adults} ${plur('Adult', passengers.adults)}, ${passengers.children} ${plur(
      'Child',
      passengers.children,
    )}, ${passengers.infants} ${plur('Infant', passengers.infants)}`;
  }

  private markAsTouched() {
    if (!this.isDisabled && !this.isTouched && this.onTouched) {
      this.isTouched = true;
      this.onTouched();
    }
  }

  private setComponentControl(): void {
    const injectedControl = this.injector.get(NgControl);

    switch (injectedControl.constructor) {
      case NgModel: {
        const { control, update } = injectedControl as NgModel;

        this.formControl = control;

        this.formControl.valueChanges
          .pipe(
            tap((value) => update.emit(value)),
            takeUntil(this.destroy$$),
          )
          .subscribe();
        break;
      }
      case FormControlName: {
        this.formControl = this.injector.get(FormGroupDirective).getControl(injectedControl as FormControlName);
        break;
      }
      default: {
        this.formControl = (injectedControl as FormControlDirective).form as FormControl;
      }
    }
  }
}
