import { TestBed } from '@angular/core/testing';

import { FormGroupProviderService } from './form-group-provider.service';

describe('FormGroupProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormGroupProviderService = TestBed.get(FormGroupProviderService);
    expect(service).toBeTruthy();
  });
});
