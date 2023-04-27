import { BookingModel } from '@shared/models/booking-data.model';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';

export const mockBookingsData: Array<BookingModel> = [
  {
    flightNumber: 'FR 1925',
    flightType: 'roundtrip',
    fligthsData: [
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
    price: 551.38,
  },

  {
    flightNumber: 'FR 1936',
    flightType: 'oneway',
    fligthsData: [
      {
        departure: 'Gdansk',
        arrival: 'Warsaw',
        departureDate: { date: new TuiDay(2023, 4, 28), time: new TuiTime(15, 40) },
        arrivalDate: { date: new TuiDay(2023, 4, 28), time: new TuiTime(16, 40) },
      },
    ],
    passengers: {
      adults: 1,
    },
    price: 20.96,
  },
];
