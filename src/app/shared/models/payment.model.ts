export interface PriceDetails {
  fare: number;
  tax: number;
  serviceCharge: number;
}

export interface Price {
  adults: PriceDetails;
  children: PriceDetails;
  infants: PriceDetails;
}

export interface PaymentDetails {
  flightNumber: string;
  price: Price;
}
