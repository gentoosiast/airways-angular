import { PassengersDataPipe } from './passengers-data.pipe';

describe('PassengersDataPipe', () => {
  it('create an instance', () => {
    const pipe = new PassengersDataPipe();
    expect(pipe).toBeTruthy();
  });
});
