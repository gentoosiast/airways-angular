import { Booking } from '@shared/types/booking';

export const mockBookingsData: Array<Booking> = [
  {
    flightType: 'roundtrip',
    flight: {
      flightNumber: 'IQ 9463',
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
      departureDate: '2023-06-11T03:20:00.000Z',
      arrivalDate: '2023-06-11T07:18:00.000Z',
      flightDuration: 209,
      price: {
        total: {
          EUR: 737.23,
          USD: 810.95,
          RUB: 63239.43,
          PLN: 3369.13,
        },
        adults: {
          fare: {
            EUR: 150.24,
            USD: 165.27,
            RUB: 12887.71,
            PLN: 686.6,
          },
          tax: {
            EUR: 43.77,
            USD: 48.14,
            RUB: 3754.25,
            PLN: 200.01,
          },
        },
        children: {
          fare: {
            EUR: 97.66,
            USD: 107.42,
            RUB: 8377.01,
            PLN: 446.29,
          },
          tax: {
            EUR: 28.45,
            USD: 31.29,
            RUB: 2440.26,
            PLN: 130.01,
          },
        },
        infants: {
          fare: {
            EUR: 75.12,
            USD: 82.63,
            RUB: 6443.85,
            PLN: 343.3,
          },
          tax: {
            EUR: 21.88,
            USD: 24.07,
            RUB: 1877.12,
            PLN: 100.01,
          },
        },
      },
      seats: 157,
      availableSeats: 17,
      connections: [],
    },
    returnFlight: {
      flightNumber: 'AF 3192',
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
      departureDate: '2023-06-28T21:45:00.000Z',
      arrivalDate: '2023-06-29T01:45:00.000Z',
      flightDuration: 219,
      price: {
        total: {
          EUR: 945.18,
          USD: 1039.69,
          RUB: 81077.16,
          PLN: 4319.45,
        },
        adults: {
          fare: {
            EUR: 193.33,
            USD: 212.66,
            RUB: 16583.93,
            PLN: 883.52,
          },
          tax: {
            EUR: 55.4,
            USD: 60.94,
            RUB: 4752.16,
            PLN: 253.18,
          },
        },
        children: {
          fare: {
            EUR: 125.67,
            USD: 138.23,
            RUB: 10779.56,
            PLN: 574.29,
          },
          tax: {
            EUR: 36.01,
            USD: 39.61,
            RUB: 3088.9,
            PLN: 164.56,
          },
        },
        infants: {
          fare: {
            EUR: 96.67,
            USD: 106.33,
            RUB: 8291.97,
            PLN: 441.76,
          },
          tax: {
            EUR: 27.7,
            USD: 30.47,
            RUB: 2376.08,
            PLN: 126.59,
          },
        },
      },
      seats: 344,
      availableSeats: 30,
      connections: [],
    },
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
    flightType: 'oneway',
    flight: {
      flightNumber: 'LI 5121',
      departureAirport: {
        id: 58,
        iata_code: 'LIS',
        name: 'Lisboa',
        city: 'Lisbon',
        country: 'Portugal',
      },
      arrivalAirport: {
        id: 73,
        iata_code: 'IAD',
        name: 'Washington Dulles Intl',
        city: 'Washington',
        country: 'United States',
      },
      departureDate: '2023-06-08T13:45:00.000Z',
      arrivalDate: '2023-06-08T18:35:00.000Z',
      flightDuration: 263,
      price: {
        total: {
          EUR: 685.06,
          USD: 753.57,
          RUB: 58764.53,
          PLN: 3130.73,
        },
        adults: {
          fare: {
            EUR: 131.71,
            USD: 144.88,
            RUB: 11298,
            PLN: 601.91,
          },
          tax: {
            EUR: 48.57,
            USD: 53.43,
            RUB: 4166.35,
            PLN: 221.97,
          },
        },
        children: {
          fare: {
            EUR: 85.61,
            USD: 94.17,
            RUB: 7343.7,
            PLN: 391.24,
          },
          tax: {
            EUR: 31.57,
            USD: 34.73,
            RUB: 2708.13,
            PLN: 144.28,
          },
        },
        infants: {
          fare: {
            EUR: 65.85,
            USD: 72.44,
            RUB: 5649,
            PLN: 300.96,
          },
          tax: {
            EUR: 24.29,
            USD: 26.71,
            RUB: 2083.18,
            PLN: 110.98,
          },
        },
      },
      seats: 294,
      availableSeats: 0,
      connections: ['ODI', 'GUN'],
    },
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
    flightType: 'oneway',
    flight: {
      flightNumber: 'JH 0249',
      departureAirport: {
        id: 96,
        iata_code: 'HND',
        name: 'Tokyo Intl',
        city: 'Tokyo',
        country: 'Japan',
      },
      arrivalAirport: {
        id: 3,
        iata_code: 'PEK',
        name: 'Capital Intl',
        city: 'Beijing',
        country: 'China',
      },
      departureDate: '2023-06-08T14:45:00.000Z',
      arrivalDate: '2023-06-08T18:15:00.000Z',
      flightDuration: 181,
      price: {
        total: {
          EUR: 836.14,
          USD: 919.76,
          RUB: 71724.47,
          PLN: 3821.18,
        },
        adults: {
          fare: {
            EUR: 164.16,
            USD: 180.58,
            RUB: 14081.68,
            PLN: 750.21,
          },
          tax: {
            EUR: 55.88,
            USD: 61.47,
            RUB: 4793.18,
            PLN: 255.36,
          },
        },
        children: {
          fare: {
            EUR: 106.7,
            USD: 117.37,
            RUB: 9153.09,
            PLN: 487.64,
          },
          tax: {
            EUR: 36.32,
            USD: 39.95,
            RUB: 3115.57,
            PLN: 165.98,
          },
        },
        infants: {
          fare: {
            EUR: 82.08,
            USD: 90.29,
            RUB: 7040.84,
            PLN: 375.11,
          },
          tax: {
            EUR: 27.94,
            USD: 30.73,
            RUB: 2396.59,
            PLN: 127.68,
          },
        },
      },
      seats: 266,
      availableSeats: 0,
      connections: [],
    },
    returnFlight: {
      flightNumber: 'BO 5339',
      departureAirport: {
        id: 3,
        iata_code: 'PEK',
        name: 'Capital Intl',
        city: 'Beijing',
        country: 'China',
      },
      arrivalAirport: {
        id: 96,
        iata_code: 'HND',
        name: 'Tokyo Intl',
        city: 'Tokyo',
        country: 'Japan',
      },
      departureDate: '2023-06-24T16:05:00.000Z',
      arrivalDate: '2023-06-24T21:28:00.000Z',
      flightDuration: 297,
      price: {
        total: {
          EUR: 776.41,
          USD: 854.06,
          RUB: 66600.83,
          PLN: 3548.21,
        },
        adults: {
          fare: {
            EUR: 147.54,
            USD: 162.3,
            RUB: 12656.36,
            PLN: 674.28,
          },
          tax: {
            EUR: 56.78,
            USD: 62.45,
            RUB: 4870.18,
            PLN: 259.46,
          },
        },
        children: {
          fare: {
            EUR: 95.9,
            USD: 105.49,
            RUB: 8226.63,
            PLN: 438.28,
          },
          tax: {
            EUR: 36.9,
            USD: 40.59,
            RUB: 3165.61,
            PLN: 168.65,
          },
        },
        infants: {
          fare: {
            EUR: 73.77,
            USD: 81.15,
            RUB: 6328.18,
            PLN: 337.14,
          },
          tax: {
            EUR: 28.39,
            USD: 31.23,
            RUB: 2435.09,
            PLN: 129.73,
          },
        },
      },
      seats: 252,
      availableSeats: 61,
      connections: [],
    },
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
    flightType: 'oneway',
    flight: {
      flightNumber: 'WW 9107',
      departureAirport: {
        id: 5,
        iata_code: 'CDG',
        name: 'Charles De Gaulle',
        city: 'Paris',
        country: 'France',
      },
      arrivalAirport: {
        id: 29,
        iata_code: 'BRU',
        name: 'Brussels Natl',
        city: 'Brussels',
        country: 'Belgium',
      },
      departureDate: '2023-06-08T23:55:00.000Z',
      arrivalDate: '2023-06-09T03:32:00.000Z',
      flightDuration: 194,
      price: {
        total: {
          EUR: 994.23,
          USD: 1093.65,
          RUB: 85285.16,
          PLN: 4543.64,
        },
        adults: {
          fare: {
            EUR: 227.53,
            USD: 250.29,
            RUB: 19517.69,
            PLN: 1039.82,
          },
          tax: {
            EUR: 34.11,
            USD: 37.52,
            RUB: 2925.77,
            PLN: 155.87,
          },
        },
        children: {
          fare: {
            EUR: 147.9,
            USD: 162.69,
            RUB: 12686.5,
            PLN: 675.88,
          },
          tax: {
            EUR: 22.17,
            USD: 24.39,
            RUB: 1901.75,
            PLN: 101.32,
          },
        },
        infants: {
          fare: {
            EUR: 113.77,
            USD: 125.14,
            RUB: 9758.85,
            PLN: 519.91,
          },
          tax: {
            EUR: 17.05,
            USD: 18.76,
            RUB: 1462.88,
            PLN: 77.94,
          },
        },
      },
      seats: 297,
      availableSeats: 116,
      connections: ['PVG'],
    },
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
