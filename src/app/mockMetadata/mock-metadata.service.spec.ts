import { TestBed } from '@angular/core/testing';

import { MockMetadataService } from './mock-metadata.service';

describe('MockMetadataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockMetadataService = TestBed.get(MockMetadataService);
    expect(service).toBeTruthy();
  });
});
