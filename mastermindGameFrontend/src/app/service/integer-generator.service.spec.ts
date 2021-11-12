import { TestBed } from '@angular/core/testing';

import { IntegerGeneratorService } from './integer-generator.service';

describe('IntegerGeneratorService', () => {
  let service: IntegerGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegerGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
