import { TestBed, async, inject } from '@angular/core/testing';

import { PairsBirthyearGuard } from './pairs-birthyear.guard';

describe('PairsBirthyearGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PairsBirthyearGuard]
    });
  });

  it('should ...', inject([PairsBirthyearGuard], (guard: PairsBirthyearGuard) => {
    expect(guard).toBeTruthy();
  }));
});
