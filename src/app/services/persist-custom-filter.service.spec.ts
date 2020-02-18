import { TestBed, inject } from '@angular/core/testing';

import { PersistCustomFilterService } from './persist-custom-filter.service';

describe('PersistCustomFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersistCustomFilterService]
    });
  });

  it('should be created', inject([PersistCustomFilterService], (service: PersistCustomFilterService) => {
    expect(service).toBeTruthy();
  }));
});
