import { TestBed } from '@angular/core/testing';

import { ChangeLogTipService } from './change-log-tip.service';

describe('ChangeLogTipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeLogTipService = TestBed.get(ChangeLogTipService);
    expect(service).toBeTruthy();
  });
});
