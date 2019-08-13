import { TestBed } from '@angular/core/testing';

import { DigiclockService } from './digiclock.service';

describe('DigiclockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DigiclockService = TestBed.get(DigiclockService);
    expect(service).toBeTruthy();
  });
});
