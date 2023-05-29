import { Price, PriceComponents, FlightPrice } from '@shared/types/flight-price';

function sumPrices(price1: Price, price2: Price): Price {
  return {
    EUR: price1.EUR + price2.EUR,
    USD: price1.USD + price2.USD,
    RUB: price1.RUB + price2.RUB,
    PLN: price1.PLN + price2.PLN,
  };
}

function sumPriceComponents(priceComponent1: PriceComponents, priceComponent2: PriceComponents): PriceComponents {
  return {
    fare: sumPrices(priceComponent1.fare, priceComponent2.fare),
    tax: sumPrices(priceComponent1.tax, priceComponent2.tax),
  };
}

export function sumFlightPrices(flightPrice1: FlightPrice, flightPrice2: FlightPrice): FlightPrice {
  return {
    total: sumPrices(flightPrice1.total, flightPrice2.total),
    adults: sumPriceComponents(flightPrice1.adults, flightPrice2.adults),
    children: sumPriceComponents(flightPrice1.children, flightPrice2.children),
    infants: sumPriceComponents(flightPrice1.infants, flightPrice2.infants),
  };
}
