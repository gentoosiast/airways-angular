import { Gender } from '@core/types/social-data';

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
  birthDate: string;
  baggageCount: number;
  isAssistanceNeeded: boolean;
  seat?: string;
  category: PassengerCategory;
}

export interface PassengerContacts {
  phone: string;
  email: string;
}

export interface PassengersInfo {
  passengers: Passenger[];
  contacts: PassengerContacts;
}
