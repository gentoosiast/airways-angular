import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { TuiDay } from '@taiga-ui/cdk';
import { Gender } from '@core/types/social-data';
import { Passenger, PassengerCategory, PassengerContacts, Passengers, PassengersInfo } from '@shared/types/passengers';
import { savePassengersInfo } from '@store/actions/flight-data.actions';
import { selectFlightSearchData, selectPassengersInfo } from '@store/selectors/flight-data.selectors';
import { generateRandomSeatLetter, generateRandomSeatNumber } from './random-generator';

interface PassengerFormGroup {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  gender: FormControl<Gender | null>;
  birthDate: FormControl<TuiDay | null>;
  baggageCount: FormControl<number | null>;
  isAssistanceNeeded: FormControl<boolean | null>;
  category: FormControl<PassengerCategory | null>;
}

@Component({
  selector: 'air-booking-passengers-page',
  templateUrl: './booking-passengers-page.component.html',
  styleUrls: ['./booking-passengers-page.component.scss'],
})
export class BookingPassengersPageComponent implements OnInit, OnDestroy {
  maxAllowedDate = TuiDay.currentLocal();
  passengersForm = this.fb.group({
    passengers: new FormArray<FormGroup<PassengerFormGroup>>([]),
    contacts: this.fb.group({
      phone: this.fb.control<string | null>('', [Validators.required]),
      email: this.fb.control<string | null>('', [Validators.required, Validators.email]),
    }),
  });
  private flightsSearchData$ = this.store.select(selectFlightSearchData);
  private passengersInfo$ = this.store.select(selectPassengersInfo);
  private sub = new Subscription();

  constructor(private fb: FormBuilder, private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.seedFormFromStore();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get contacts() {
    return this.passengersForm.get('contacts');
  }

  get passengers() {
    return this.passengersForm.controls['passengers'] as FormArray<FormGroup<PassengerFormGroup>>;
  }

  onBackButton(): void {
    this.router.navigateByUrl('/booking/step-flights');
  }

  onSubmit(): void {
    if (this.passengersForm.invalid) {
      return;
    }

    const passengers: Passenger[] = [];

    let startingSeatNumber = generateRandomSeatNumber();
    const seatLetter = generateRandomSeatLetter();

    for (let i = 0; i < this.passengers.value.length; i++) {
      const passenger = this.passengers.value[i];
      let seat: string | undefined;

      if (
        !passenger ||
        !passenger.firstName ||
        !passenger.lastName ||
        !passenger.gender ||
        !passenger.birthDate ||
        typeof passenger.baggageCount !== 'number' ||
        typeof passenger.isAssistanceNeeded !== 'boolean' ||
        !passenger.category
      ) {
        return;
      }

      if (passenger.category !== 'infants') {
        seat = `${startingSeatNumber}${seatLetter}`;
        startingSeatNumber++;
      }

      passengers.push({
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        gender: passenger.gender,
        birthDate: passenger.birthDate.toUtcNativeDate().toISOString(),
        baggageCount: passenger.baggageCount,
        isAssistanceNeeded: passenger.isAssistanceNeeded,
        seat,
        category: passenger.category,
      });
    }

    const contactsValue = this.contacts?.value;
    if (!contactsValue || !contactsValue.email || !contactsValue.phone) {
      return;
    }

    const contacts: PassengerContacts = {
      email: contactsValue.email,
      phone: contactsValue.phone,
    };

    const passengersInfo: PassengersInfo = { passengers, contacts };

    this.store.dispatch(savePassengersInfo({ passengersInfo }));

    this.router.navigateByUrl('/booking/step-summary');
  }

  private fillForm(passengers: Passengers, passengersInfo: PassengersInfo | null): void {
    if (passengersInfo) {
      this.passengersForm.patchValue({
        contacts: passengersInfo.contacts,
      });
    }

    Object.entries(passengers).forEach(([category, qty], idx) => {
      const passenger = passengersInfo?.passengers[idx];
      const passengerBirthDate = passenger?.birthDate ? TuiDay.fromUtcNativeDate(new Date(passenger?.birthDate)) : null;

      for (let i = 0; i < qty; i++) {
        const fbGroup = this.fb.group<PassengerFormGroup>({
          firstName: this.fb.control(passenger?.firstName ?? '', [
            Validators.required,
            Validators.pattern(/^\p{Letter}+$/u),
          ]),
          lastName: this.fb.control(passenger?.lastName ?? '', [
            Validators.required,
            Validators.pattern(/^\p{Letter}+$/u),
          ]),
          gender: this.fb.control(passenger?.gender ?? 'male'),
          birthDate: this.fb.control(passengerBirthDate, [Validators.required]), // TODO: add validator to check if value matches age limit for its passenger category
          baggageCount: this.fb.control(passenger?.baggageCount ?? 0),
          isAssistanceNeeded: this.fb.control(passenger?.isAssistanceNeeded ?? category === 'infant'),
          category: this.fb.control(category as PassengerCategory),
        });
        this.passengers.push(fbGroup);
      }
    });
  }

  private seedFormFromStore(): void {
    this.sub.add(
      combineLatest([this.flightsSearchData$, this.passengersInfo$]).subscribe(([flightSearchData, passengersInfo]) => {
        if (!flightSearchData) {
          return;
        }

        this.fillForm(flightSearchData.passengers, passengersInfo);
      }),
    );
  }
}
