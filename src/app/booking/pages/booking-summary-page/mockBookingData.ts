import { Booking } from '@shared/types/booking';

export const mockBookingData: Booking = {
  flightType: 'roundtrip',
  flight: {
    flightNumber: 'TH 7454',
    departureAirport: {
      id: 83,
      iata_code: 'LED',
      name: 'Pulkovo',
      city: 'St. Petersburg',
      country: 'Russia',
    },
    arrivalAirport: {
      id: 6,
      iata_code: 'LAX',
      name: 'Los Angeles Intl',
      city: 'Los Angeles',
      country: 'United States',
    },
    departureDate: '2023-06-08T17:20:00.000Z',
    arrivalDate: '2023-06-08T22:57:00.000Z',
    flightDuration: 313,
    price: {
      total: {
        EUR: 1008.18,
        USD: 1108.99,
        RUB: 86481.31,
        PLN: 4607.36,
      },
      adults: {
        fare: {
          EUR: 235.08,
          USD: 258.58,
          RUB: 20164.75,
          PLN: 1074.29,
        },
        tax: {
          EUR: 30.23,
          USD: 33.26,
          RUB: 2593.49,
          PLN: 138.17,
        },
      },
      children: {
        fare: {
          EUR: 152.8,
          USD: 168.08,
          RUB: 13107.09,
          PLN: 698.29,
        },
        tax: {
          EUR: 19.65,
          USD: 21.62,
          RUB: 1685.77,
          PLN: 89.81,
        },
      },
      infants: {
        fare: {
          EUR: 117.54,
          USD: 129.29,
          RUB: 10082.38,
          PLN: 537.15,
        },
        tax: {
          EUR: 15.12,
          USD: 16.63,
          RUB: 1296.74,
          PLN: 69.09,
        },
      },
    },
    seats: 294,
    availableSeats: 0,
    connections: [],
  },
  returnFlight: {
    flightNumber: 'KV 7713',
    departureAirport: {
      id: 6,
      iata_code: 'LAX',
      name: 'Los Angeles Intl',
      city: 'Los Angeles',
      country: 'United States',
    },
    arrivalAirport: {
      id: 83,
      iata_code: 'LED',
      name: 'Pulkovo',
      city: 'St. Petersburg',
      country: 'Russia',
    },
    departureDate: '2023-06-25T10:00:00.000Z',
    arrivalDate: '2023-06-25T14:23:00.000Z',
    flightDuration: 245,
    price: {
      total: {
        EUR: 813.81,
        USD: 895.19,
        RUB: 69808.32,
        PLN: 3719.1,
      },
      adults: {
        fare: {
          EUR: 178.9,
          USD: 196.8,
          RUB: 15346.45,
          PLN: 817.59,
        },
        tax: {
          EUR: 35.25,
          USD: 38.78,
          RUB: 3024.16,
          PLN: 161.11,
        },
      },
      children: {
        fare: {
          EUR: 116.29,
          USD: 127.92,
          RUB: 9975.19,
          PLN: 531.44,
        },
        tax: {
          EUR: 22.92,
          USD: 25.21,
          RUB: 1965.7,
          PLN: 104.72,
        },
      },
      infants: {
        fare: {
          EUR: 89.45,
          USD: 98.4,
          RUB: 7673.23,
          PLN: 408.8,
        },
        tax: {
          EUR: 17.63,
          USD: 19.39,
          RUB: 1512.08,
          PLN: 80.56,
        },
      },
    },
    seats: 212,
    availableSeats: 138,
    connections: ['MEU', 'IRC'],
  },
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
      baggageCount: 2,
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
