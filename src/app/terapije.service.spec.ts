import { TestBed } from '@angular/core/testing';

import { TerapijeService } from './terapije.service';

describe('TerapijeService', () => {
  let service: TerapijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerapijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
