import { Booking } from '@shared/types/booking';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';

export const mockBookingData: Booking = {
  flightNumber: 'FR 1925',
  flightType: 'roundtrip',
  flightsData: [
    {
      departure: 'Dublin',
      arrival: 'Warsaw',
      departureDate: { date: new TuiDay(2023, 2, 1), time: new TuiTime(8, 40) },
      arrivalDate: { date: new TuiDay(2023, 2, 1), time: new TuiTime(12, 0) },
    },
    {
      departure: 'Modlin',
      arrival: 'Dublin',
      departureDate: { date: new TuiDay(2023, 2, 18), time: new TuiTime(7, 40) },
      arrivalDate: { date: new TuiDay(2023, 2, 18), time: new TuiTime(11, 0) },
    },
  ],
  passengers: {
    adults: 2,
    children: 0,
    infants: 1,
  },
  passengerData: [
    {
      firstName: 'Lili',
      lastName: 'Potter',
      gender: 'female',
      birthDate: '1960-07-31',
      baggageCount: 1,
      isAssistanceNeeded: false,
      seat: '19E',
      category: 'adults',
    },
    {
      firstName: 'James',
      lastName: 'Potter',
      gender: 'male',
      birthDate: '1960-10-01',
      baggageCount: 1,
      isAssistanceNeeded: false,
      seat: '20E',
      category: 'adults',
    },
    {
      firstName: 'Harry',
      lastName: 'Potter',
      gender: 'male',
      birthDate: '1960-06-31',
      baggageCount: 0,
      isAssistanceNeeded: false,
      category: 'infants',
    },
  ],
  price: 551.38,
};
