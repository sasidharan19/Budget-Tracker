// auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpService);
  private apiUrl = 'http://localhost:5000/api/auth';

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(res => sessionStorage.setItem('jwt', res.token))
      );
  }

  logout() {
    sessionStorage.removeItem('jwt');
  }

  getToken() {
    return sessionStorage.getItem('jwt');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
