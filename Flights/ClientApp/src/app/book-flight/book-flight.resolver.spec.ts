import { TestBed } from '@angular/core/testing';

import { BookFlightResolver } from './book-flight.resolver';

describe('BookFlightResolver', () => {
  let resolver: BookFlightResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BookFlightResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
