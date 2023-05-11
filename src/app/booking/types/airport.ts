interface Geolocation {
  lat: number;
  lng: number;
}

export interface Airport {
  name: string;
  city: string;
  country: string;
  iata_code: string;
  _geoloc: Geolocation;
  links_count: number;
  objectID: string;
}
