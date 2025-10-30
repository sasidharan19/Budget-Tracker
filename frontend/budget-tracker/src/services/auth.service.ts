import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpService);
  private apiUrl = `${environment.apiUrl}/auth`;

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
