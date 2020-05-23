import { TestBed, inject, async } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('NotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule],
      providers: [
        NotificationsService,
      ]
    });
  });

  it(`should create`, async(inject([NotificationsService, HttpTestingController],
    (service: NotificationsService, backend: HttpTestingController) => {
      expect(service).toBeTruthy();
    })));

});
