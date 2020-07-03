import { TestBed, inject } from '@angular/core/testing';

import { ConverterApiService } from './converter-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable, defer } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



fdescribe('ConverterApiService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConverterApiService]
    });
  });

  fit('should be created', inject([ConverterApiService], (converterApiService: ConverterApiService) => {
    expect(converterApiService).toBeTruthy();
  }));

  fit('should return array of strings', () => {
    const converterApiService = TestBed.inject(ConverterApiService);

    converterApiService.getCurrencies().subscribe((data) => {

    });
  });
});
