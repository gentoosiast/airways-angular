import { Booking } from '@shared/types/booking';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';

export const mockBookingsData: Array<Booking> = [
  {
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
      adults: 1,
      children: 1,
      infants: 1,
    },
    passengerData: [],
    price: 551.38,
  },

  {
    flightNumber: 'FR 1936',
    flightType: 'oneway',
    flightsData: [
      {
        departure: 'Gdansk',
        arrival: 'Warsaw',
        departureDate: { date: new TuiDay(2023, 4, 28), time: new TuiTime(15, 40) },
        arrivalDate: { date: new TuiDay(2023, 4, 28), time: new TuiTime(16, 40) },
      },
    ],
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    passengerData: [],
    price: 20.96,
  },
  {
    flightNumber: 'AR 1936',
    flightType: 'oneway',
    flightsData: [
      {
        departure: 'Paris',
        arrival: 'Berlin',
        departureDate: { date: new TuiDay(2023, 5, 28), time: new TuiTime(10, 20) },
        arrivalDate: { date: new TuiDay(2023, 5, 28), time: new TuiTime(12, 15) },
      },
    ],
    passengers: {
      adults: 1,
      children: 2,
      infants: 0,
    },
    passengerData: [
      {
        firstName: 'Lili',
        lastName: 'Potter',
        gender: 'female',
        birthDate: new TuiDay(1960, 7, 31),
        baggageCount: 1,
        isAssistanceNeeded: false,
        seat: '19E',
        passengerCategory: 'adults',
      },
      {
        firstName: 'James',
        lastName: 'Potter',
        gender: 'male',
        birthDate: new TuiDay(1960, 10, 1),
        baggageCount: 1,
        isAssistanceNeeded: false,
        seat: '20E',
        passengerCategory: 'adults',
      },
      {
        firstName: 'Harry',
        lastName: 'Potter',
        gender: 'male',
        birthDate: new TuiDay(1980, 6, 31),
        baggageCount: 0,
        isAssistanceNeeded: false,
        passengerCategory: 'infants',
      },
    ],
    price: 30.96,
  },
  {
    flightNumber: 'LL 9012',
    flightType: 'oneway',
    flightsData: [
      {
        departure: 'Warsaw',
        arrival: 'Oslo',
        departureDate: { date: new TuiDay(2023, 2, 1), time: new TuiTime(23, 0) },
        arrivalDate: { date: new TuiDay(2023, 2, 2), time: new TuiTime(1, 10) },
      },
    ],
    passengers: {
      adults: 2,
      children: 1,
      infants: 2,
    },
    passengerData: [],
    price: 273.92,
  },
];
