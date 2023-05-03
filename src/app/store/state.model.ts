import { User } from '@core/models/user.model';

export interface AppState {
  user: User | null;
}
