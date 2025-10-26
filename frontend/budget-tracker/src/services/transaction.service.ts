// src/app/services/transaction.service.ts
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

export interface TransactionDto {
  id?: number;
  userId?: number;
  categoryId: number;
  amount: number;
  date: string; // ISO date
  description?: string;
  type: 'income' | 'expense';
}

export interface PagedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; pages: number };
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private base = 'http://localhost:5000/api/transactions'; // replace with deployed API URL

  constructor(private http: HttpService) {}

  list(params: {
    page?: number;
    limit?: number;
    categoryId?: number;
    from?: string;
    to?: string;
    minAmount?: number;
    maxAmount?: number;
    type?: 'income' | 'expense';
  } = {}): Observable<PagedResponse<TransactionDto>> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        httpParams = httpParams.set(k, String(v));
      }
    });
    return this.http.get<PagedResponse<TransactionDto>>(this.base, httpParams);
  }

  get(id: number): Observable<TransactionDto> {
    return this.http.get<TransactionDto>(`${this.base}/${id}`);
  }

  create(payload: TransactionDto): Observable<TransactionDto> {
    return this.http.post<TransactionDto>(this.base, payload);
  }

  update(id: number, payload: Partial<TransactionDto>): Observable<TransactionDto> {
    return this.http.put<TransactionDto>(`${this.base}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
