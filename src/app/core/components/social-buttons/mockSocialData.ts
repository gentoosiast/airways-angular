import { TuiDay } from '@taiga-ui/cdk';
import { SocialData } from '@core/interfaces/social-data';

export const mockSocialData: SocialData = {
  email: 'johndoe@gmail.com',
  firstName: 'John',
  lastName: 'Doe',
  birthDate: new TuiDay(2001, 0, 3),
  gender: 'male',
  phone: '+19383559323',
  citizenship: 'USA',
};
