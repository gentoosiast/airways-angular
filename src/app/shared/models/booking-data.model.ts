import { TuiDay, TuiTime } from '@taiga-ui/cdk';

export interface FligthsData {
  departure: string;
  arrival: string;
  departureDate: { date: TuiDay; time: TuiTime };
  arrivalDate: { date: TuiDay; time: TuiTime };
}

export interface BookingModel {
  flightNumber: string;
  flightType: 'oneway' | 'roundtrip';
  fligthsData: Array<FligthsData>;
  passengers: {
    adults: number;
    children?: number;
    infants?: number;
  };
  price: number;
}
