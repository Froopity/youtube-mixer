import {TestBed} from '@angular/core/testing';

import {YoutubeApiService} from './youtube.service';

describe('YoutubeService', () => {
  let service: YoutubeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
