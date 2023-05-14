import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airport } from '@booking/types/airport';

@Injectable({
  providedIn: 'root',
})
export class AirportsService {
  constructor(private http: HttpClient) {}

  search(query: string | null): Observable<Airport[]> {
    if (!query) {
      return of([]);
    }

    const params = new HttpParams({ fromObject: { city: `${query}` } });

    return this.http.get<Airport[]>(`${environment.apiBaseUrl}/airports`, { params });
  }
}
