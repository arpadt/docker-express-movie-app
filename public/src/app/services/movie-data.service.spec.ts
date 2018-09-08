import { TestBed, inject } from '@angular/core/testing';

import { MovieDataService } from './movie-data.service';

describe('MovieDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDataService]
    });
  });

  it('should be created', inject([MovieDataService], (service: MovieDataService) => {
    expect(service).toBeTruthy();
  }));
});
