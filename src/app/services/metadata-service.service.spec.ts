import { TestBed } from '@angular/core/testing';

import { MetadataServiceService } from './metadata-service.service';

describe('MetadataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetadataServiceService = TestBed.get(MetadataServiceService);
    expect(service).toBeTruthy();
  });
});
