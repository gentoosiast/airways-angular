import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginData, LoginResponse } from '@core/types/login';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: LocalStorageService) {}

  login(loginData: LoginData): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiBaseUrl}/login`, loginData)
      .pipe(tap((response) => this.storageService.set<string>('token', response.accessToken)));
  }

  logout(): void {
    this.storageService.delete('token');
  }
}
