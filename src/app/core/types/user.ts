import { Gender } from './social-data';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
  phone: string;
  citizenship: string;
}
