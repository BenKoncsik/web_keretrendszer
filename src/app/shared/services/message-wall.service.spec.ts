import { TestBed } from '@angular/core/testing';

import { MessageWallService } from './message-wall.service';

describe('MessageWallService', () => {
  let service: MessageWallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageWallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
