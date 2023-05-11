import { PaymentDetails } from '@shared/types/payment';

export const mockPaymentData: PaymentDetails = {
  flightNumber: 'FR 1925',
  price: {
    adults: {
      fare: 166,
      tax: 50,
      serviceCharge: 41.51,
    },
    children: {
      fare: 106,
      tax: 45,
      serviceCharge: 41.51,
    },
    infants: {
      fare: 88,
      tax: 5,
      serviceCharge: 5,
    },
  },
};
