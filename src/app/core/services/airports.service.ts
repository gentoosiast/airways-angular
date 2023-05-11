import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airport } from '@booking/types/airport';

@Injectable({
  providedIn: 'root',
})
export class AirportsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${environment.apiBaseUrl}/airports`);
  }

  search(query: string | null): Observable<Airport[]> {
    return this.getAll().pipe(
      map((airports) => {
        return airports.filter(
          (airport) => !query || airport.city.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
        );
      }),
    );
  }
}
