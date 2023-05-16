import { User } from './user';

export interface LoginData {
  email: string;
  password: string;
}

export type SignupData = Required<Omit<User, 'id'>>;

export interface LoginSignupResponse {
  access_token: string;
  user: User;
}
