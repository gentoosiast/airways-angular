import { Gender } from './social-data';

export interface User {
  id?: number;
  password?: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
  phone: string;
  citizenship: string;
}
