import { CountPassengersPipe } from './count-passengers.pipe';

describe('CountPassengersPipe', () => {
  it('create an instance', () => {
    const pipe = new CountPassengersPipe();
    expect(pipe).toBeTruthy();
  });
});
