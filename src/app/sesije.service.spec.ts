import { TestBed } from '@angular/core/testing';

import { SesijeService } from './sesije.service';

describe('SesijeService', () => {
  let service: SesijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
