import { User } from '@core/models/user.model';

export interface LoginResponse {
  accessToken: string;
  user: User;
}
