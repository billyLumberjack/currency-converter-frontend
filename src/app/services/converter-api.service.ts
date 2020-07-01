import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { CurrenciesConversion } from '@app/models/currencies-conversion';

@Injectable({
  providedIn: 'root'
})
export class ConverterApiService {

  constructor(private httpClient: HttpClient) { }

  public getCurrencies(): Observable<Array<string>>{
    return this.httpClient.get<string[]>(`${environment.apiUrl}/currencies`);
  }

  public convert(sourceCurrency: string, destinationCurrncy: string, amounToConvert: number): Observable<CurrenciesConversion>{
    const params = new HttpParams()
      .set('sourceCurrency', sourceCurrency)
      .set('destinationCurrency', destinationCurrncy)
      .set('amount', amounToConvert.toString());

    return this.httpClient.get<CurrenciesConversion>(`${environment.apiUrl}/convert`, {params});
  }

}
