import { User } from '@core/types/user';
import { Booking } from '@shared/types/booking';

export interface AppState {
  user: User | null;
  currentOrder: Array<Booking & { isSelected: boolean }>;
}
