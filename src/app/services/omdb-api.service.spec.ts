import { TestBed } from '@angular/core/testing';

import { OmdbApiService } from './omdb-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OmdbApiService', () => {
  let service: OmdbApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OmdbApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
