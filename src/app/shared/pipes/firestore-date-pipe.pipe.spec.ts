import { FirestoreDatePipePipe } from './firestore-date-pipe.pipe';

describe('FirestoreDatePipePipe', () => {
  it('create an instance', () => {
    const pipe = new FirestoreDatePipePipe();
    expect(pipe).toBeTruthy();
  });
});
