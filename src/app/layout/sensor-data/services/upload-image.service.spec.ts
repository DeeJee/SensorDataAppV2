import { TestBed, inject } from '@angular/core/testing';

import { UploadImageService } from './upload-image.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UploadImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [UploadImageService]
    });
  });

  it('should be created', inject([UploadImageService], (service: UploadImageService) => {
    expect(service).toBeTruthy();
  }));
});
