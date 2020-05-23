import { TestBed, inject } from '@angular/core/testing';

import { DatasourceService } from './datasource.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('DatasourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatasourceService]
    });
  });

  it('should be created', inject([DatasourceService], (service: DatasourceService) => {
    expect(service).toBeTruthy();
  }));


});
