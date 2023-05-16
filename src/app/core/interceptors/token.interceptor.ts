import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { LocalStorageService } from '@core/services/local-storage.service';
import { STORAGE_ACCESS_TOKEN_KEY } from '@shared/constants/storage.constants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorageService.get<string>(STORAGE_ACCESS_TOKEN_KEY);

    if (token) {
      const newRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      return next.handle(newRequest);
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.router.navigateByUrl('/');
        }
        return throwError(() => err);
      }),
    );
  }
}
