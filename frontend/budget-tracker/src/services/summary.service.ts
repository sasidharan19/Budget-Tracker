import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

export interface CategorySummary {
  categoryId: number;
  categoryName: string;
  amount: number;
}

export interface SummaryDto {
  month: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  budget?: number;
  budgetRemaining?: number;
  byCategory: CategorySummary[];
  income: number;
  expense: number;
}

@Injectable({ providedIn: 'root' })
export class SummaryService {
  private http = inject(HttpService);
  private base = 'http://localhost:5000/api/budgets/summary';

  getSummary(month?: string): Observable<SummaryDto> {
    const url = month ? `${this.base}?month=${encodeURIComponent(month)}` : this.base;
    return this.http.get<SummaryDto>(url);
  }
}
