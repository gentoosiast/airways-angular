import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginData, SignupData, LoginSignupResponse } from '@core/types/login-signup';
import { LocalStorageService } from './local-storage.service';
import { STORAGE_ACCESS_TOKEN_KEY, STORAGE_USER_KEY } from '@shared/constants/storage.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: LocalStorageService) {}

  login(loginData: LoginData): Observable<LoginSignupResponse> {
    return this.http.post<LoginSignupResponse>(`${environment.apiBaseUrl}/auth/login`, loginData).pipe(
      tap((response) => this.storageService.set<string>('token', response.access_token)),
      catchError(this.handleError),
    );
  }

  logout(): void {
    this.storageService.delete(STORAGE_ACCESS_TOKEN_KEY);
    this.storageService.delete(STORAGE_USER_KEY);
  }

  signup(signupData: SignupData): Observable<LoginSignupResponse> {
    return this.http.post<LoginSignupResponse>(`${environment.apiBaseUrl}/auth/signup`, signupData).pipe(
      tap((response) => this.storageService.set<string>(STORAGE_ACCESS_TOKEN_KEY, response.access_token)),
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => new Error(`Network error: ${error.message}`));
    } else {
      return throwError(() => new Error(`HTTP Error ${error.status}: ${error.error.message}`));
    }
  }
}
