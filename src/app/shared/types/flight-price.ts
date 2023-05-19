interface Price {
  EUR: number;
  USD: number;
  RUB: number;
  PLN: number;
}

interface PriceComponents {
  fare: Price;
  tax: Price;
}

export interface FlightPrice {
  total: Price;
  adults: PriceComponents;
  children: PriceComponents;
  infants: PriceComponents;
}
