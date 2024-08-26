import { TestBed } from '@angular/core/testing';

import { DoctorGuardGuard } from './doctor-guard.guard';

describe('DoctorGuardGuard', () => {
  let guard: DoctorGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DoctorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
