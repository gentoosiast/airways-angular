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
  price: {
    total: {
      EUR: 686.6,
      USD: 755.26,
      RUB: 58896.35,
      PLN: 3137.75,
    },
    adults: {
      fare: {
        EUR: 142.14,
        USD: 156.36,
        RUB: 12192.96,
        PLN: 649.59,
      },
      tax: {
        EUR: 38.54,
        USD: 42.4,
        RUB: 3306.08,
        PLN: 176.13,
      },
    },
    children: {
      fare: {
        EUR: 92.39,
        USD: 101.63,
        RUB: 7925.42,
        PLN: 422.23,
      },
      tax: {
        EUR: 25.05,
        USD: 27.56,
        RUB: 2148.95,
        PLN: 114.49,
      },
    },
    infants: {
      fare: {
        EUR: 71.07,
        USD: 78.18,
        RUB: 6096.48,
        PLN: 324.79,
      },
      tax: {
        EUR: 19.27,
        USD: 21.2,
        RUB: 1653.04,
        PLN: 88.07,
      },
    },
  },
};
