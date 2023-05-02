import { UserNameByEmailPipe } from './user-name-by-email.pipe';

describe('UserNameByEmailPipe', () => {
  it('create an instance', () => {
    const pipe = new UserNameByEmailPipe();
    expect(pipe).toBeTruthy();
  });
});
