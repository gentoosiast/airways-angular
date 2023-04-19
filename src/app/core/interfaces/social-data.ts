import { TuiDay } from '@taiga-ui/cdk';

export type Gender = 'male' | 'female';

export interface SocialData {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: TuiDay;
  gender: Gender;
  phone: string;
  citizenship: string;
}
