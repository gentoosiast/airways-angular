export interface Price {
  EUR: number;
  USD: number;
  RUB: number;
  PLN: number;
}

export interface PriceComponents {
  fare: Price;
  tax: Price;
}

export interface FlightPrice {
  total: Price;
  adults: PriceComponents;
  children: PriceComponents;
  infants: PriceComponents;
}
