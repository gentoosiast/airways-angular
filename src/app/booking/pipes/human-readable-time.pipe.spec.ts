import { HumanReadableTimePipe } from './human-readable-time.pipe';

describe('HumanReadableTimePipe', () => {
  it('create an instance', () => {
    const pipe = new HumanReadableTimePipe();
    expect(pipe).toBeTruthy();
  });
});
