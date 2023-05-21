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
    price: {
      total: {
        EUR: 547.43,
        USD: 602.18,
        RUB: 46958.9,
        PLN: 2501.77,
      },
      adults: {
        fare: {
          EUR: 121.5,
          USD: 133.65,
          RUB: 10422.13,
          PLN: 555.25,
        },
        tax: {
          EUR: 22.56,
          USD: 24.82,
          RUB: 1935.47,
          PLN: 103.11,
        },
      },
      children: {
        fare: {
          EUR: 78.97,
          USD: 86.87,
          RUB: 6774.39,
          PLN: 360.91,
        },
        tax: {
          EUR: 14.67,
          USD: 16.13,
          RUB: 1258.06,
          PLN: 67.02,
        },
      },
      infants: {
        fare: {
          EUR: 60.75,
          USD: 66.82,
          RUB: 5211.07,
          PLN: 277.62,
        },
        tax: {
          EUR: 11.28,
          USD: 12.41,
          RUB: 967.74,
          PLN: 51.56,
        },
      },
    },
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
    price: {
      total: {
        EUR: 1030.16,
        USD: 1133.18,
        RUB: 88367.54,
        PLN: 4707.85,
      },
      adults: {
        fare: {
          EUR: 222.87,
          USD: 245.16,
          RUB: 19117.81,
          PLN: 1018.52,
        },
        tax: {
          EUR: 48.23,
          USD: 53.05,
          RUB: 4136.81,
          PLN: 220.39,
        },
      },
      children: {
        fare: {
          EUR: 144.87,
          USD: 159.35,
          RUB: 12426.57,
          PLN: 662.04,
        },
        tax: {
          EUR: 31.35,
          USD: 34.48,
          RUB: 2688.93,
          PLN: 143.25,
        },
      },
      infants: {
        fare: {
          EUR: 111.44,
          USD: 122.58,
          RUB: 9558.9,
          PLN: 509.26,
        },
        tax: {
          EUR: 24.11,
          USD: 26.52,
          RUB: 2068.4,
          PLN: 110.2,
        },
      },
    },
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
        birthDate: '1980-06-31',
        baggageCount: 0,
        isAssistanceNeeded: false,
        category: 'infants',
      },
    ],
    price: {
      total: {
        EUR: 793.16,
        USD: 872.48,
        RUB: 68037.49,
        PLN: 3624.75,
      },
      adults: {
        fare: {
          EUR: 176.37,
          USD: 194.01,
          RUB: 15129.1,
          PLN: 806.02,
        },
        tax: {
          EUR: 32.36,
          USD: 35.59,
          RUB: 2775.5,
          PLN: 147.87,
        },
      },
      children: {
        fare: {
          EUR: 114.64,
          USD: 126.11,
          RUB: 9833.92,
          PLN: 523.91,
        },
        tax: {
          EUR: 21.03,
          USD: 23.13,
          RUB: 1804.07,
          PLN: 96.11,
        },
      },
      infants: {
        fare: {
          EUR: 88.19,
          USD: 97,
          RUB: 7564.55,
          PLN: 403.01,
        },
        tax: {
          EUR: 16.18,
          USD: 17.8,
          RUB: 1387.75,
          PLN: 73.93,
        },
      },
    },
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
    price: {
      total: {
        EUR: 942.97,
        USD: 1037.27,
        RUB: 80887.9,
        PLN: 4309.37,
      },
      adults: {
        fare: {
          EUR: 219.75,
          USD: 241.72,
          RUB: 18850.1,
          PLN: 1004.25,
        },
        tax: {
          EUR: 28.4,
          USD: 31.24,
          RUB: 2436.19,
          PLN: 129.79,
        },
      },
      children: {
        fare: {
          EUR: 142.84,
          USD: 157.12,
          RUB: 12252.57,
          PLN: 652.77,
        },
        tax: {
          EUR: 18.46,
          USD: 20.31,
          RUB: 1583.52,
          PLN: 84.36,
        },
      },
      infants: {
        fare: {
          EUR: 109.87,
          USD: 120.86,
          RUB: 9425.05,
          PLN: 502.13,
        },
        tax: {
          EUR: 14.2,
          USD: 15.62,
          RUB: 1218.09,
          PLN: 64.89,
        },
      },
    },
  },
];
