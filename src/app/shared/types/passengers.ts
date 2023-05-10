import { Gender } from '@core/types/social-data';
import { TuiDay } from '@taiga-ui/cdk';

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}

export type PassengerCategory = keyof Passengers;

export interface Passenger {
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: TuiDay;
  baggageCount: number;
  isAssistanceNeeded: boolean;
  seat?: string;
  passengerCategory: PassengerCategory;
}
