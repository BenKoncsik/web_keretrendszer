import { TestBed } from '@angular/core/testing';

import { ActiveChatService } from './active-chat.service';

describe('ActiveChatService', () => {
  let service: ActiveChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
