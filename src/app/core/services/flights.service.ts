import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FlightsRequest } from '@booking/types/flights-request';
import { Flights } from '@shared/types/flights';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  constructor(private http: HttpClient) {}

  search(searchRequest: FlightsRequest): Observable<Flights> {
    return this.http
      .post<Flights>(`${environment.apiBaseUrl}/flights`, searchRequest)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => new Error(`Network error: ${error.message}`));
    } else {
      return throwError(() => new Error(`HTTP Error ${error.status}: ${error.error.message}`));
    }
  }
}
