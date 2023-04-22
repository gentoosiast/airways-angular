import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { Gender } from '@core/interfaces/social-data';
import { passengersMockData } from './mockData';
import { PassengerCategory, Passengers } from '@shared/interfaces/passengers';

interface Passenger {
  category: PassengerCategory;
  formGroup: FormGroup;
}

interface PassengerFormGroup {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  gender: FormControl<Gender | null>;
  birthDate: FormControl<TuiDay | null>;
  baggage: FormControl<number | null>;
  isAssistanceNeeded: FormControl<boolean | null>;
}

@Component({
  selector: 'air-booking-passengers-page',
  templateUrl: './booking-passengers-page.component.html',
  styleUrls: ['./booking-passengers-page.component.scss'],
})
export class BookingPassengersPageComponent implements OnInit {
  maxAllowedDate = TuiDay.currentLocal();
  passengerData: Passenger[] = [];
  passengersForm = this.fb.group({
    passengers: new FormArray<FormGroup>([]),
    contacts: this.fb.group({
      phone: this.fb.control<string | null>('', [Validators.required]),
      email: this.fb.control<string | null>('', [Validators.required, Validators.email]),
    }),
  });

  constructor(private fb: FormBuilder) {}

  get passengers() {
    return this.passengersForm.controls['passengers'] as FormArray<FormGroup<PassengerFormGroup>>;
  }

  ngOnInit(): void {
    this.processPassengers(passengersMockData);
  }

  onSubmit() {
    // TODO
  }

  private processPassengers(passengers: Passengers): void {
    Object.entries(passengers).forEach(([category, qty]) => {
      for (let i = 0; i < qty; i++) {
        const fbGroup = this.fb.group<PassengerFormGroup>({
          firstName: this.fb.control('', [Validators.required]),
          lastName: this.fb.control('', [Validators.required]),
          gender: this.fb.control<Gender | null>('male'),
          birthDate: this.fb.control(null, [Validators.required]),
          baggage: this.fb.control(0),
          isAssistanceNeeded: this.fb.control(false),
        });
        fbGroup.patchValue({ isAssistanceNeeded: category === 'infant' });
        this.passengers.push(fbGroup);
        this.passengerData.push({ category: category as PassengerCategory, formGroup: fbGroup });
      }
    });
  }
}
