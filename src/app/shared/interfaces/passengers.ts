interface BasePassengers {
  adults: number;
  children: number;
  infants: number;
}

export type PassengerCategory = keyof BasePassengers;

export interface Passengers extends BasePassengers {
  [key: string]: number;
}
