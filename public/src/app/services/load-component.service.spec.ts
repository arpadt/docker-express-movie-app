import { TestBed, inject } from '@angular/core/testing';

import { LoadModalService } from './load-modal.service';

describe('LoadModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadModalService]
    });
  });

  it('should be created', inject([LoadModalService], (service: LoadModalService) => {
    expect(service).toBeTruthy();
  }));
});
