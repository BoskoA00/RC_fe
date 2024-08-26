import { TestBed } from '@angular/core/testing';

import { SobeService } from './sobe.service';

describe('SobeService', () => {
  let service: SobeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SobeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
