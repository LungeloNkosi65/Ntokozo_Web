import { TestBed } from '@angular/core/testing';

import { PrintermakeService } from './printermake.service';

describe('PrintermakeService', () => {
  let service: PrintermakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintermakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
