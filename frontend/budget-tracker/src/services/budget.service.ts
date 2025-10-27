import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

export interface BudgetDto {
  id?: number;
  userId?: number;
  month: string; // YYYY-MM
  amount: number;
}

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private http = inject(HttpService);
  private base = 'http://localhost:5000/api/budgets';

  getBudget(month: string): Observable<BudgetDto | null> {
    return this.http.get<BudgetDto | null>(`${this.base}?month=${encodeURIComponent(month)}`);
  }

  upsertBudget(payload: { month: string; amount: number }): Observable<BudgetDto> {
    return this.http.post<BudgetDto>(this.base, payload);
  }
}
