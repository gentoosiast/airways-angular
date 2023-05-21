export interface FlightsRequest {
  departureIATA: string;
  arrivalIATA: string;
  flightDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
}
