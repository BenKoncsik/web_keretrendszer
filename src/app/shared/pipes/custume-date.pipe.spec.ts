import { CustomDatePipePipe } from './custume-date.pipe';

describe('CustumeDatePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomDatePipePipe();
    expect(pipe).toBeTruthy();
  });
});
