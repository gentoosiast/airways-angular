export type PassengerCategory = keyof RemoveIndex<Passengers>;

// https://stackoverflow.com/questions/51465182/how-to-remove-index-signature-using-mapped-types
type RemoveIndex<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
  [key: string]: number;
}
