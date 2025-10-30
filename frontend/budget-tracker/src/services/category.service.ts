import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { environment } from '../environments/environment.prod';

export interface CategoryDto {
  id?: number;
  name: string;
  type?: 'income' | 'expense';
  userId?: number;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpService);
  private base = `${environment.apiUrl}/categories`;

  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(this.base);
  }

  getCategoryById(id: number): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.base}/${id}`);
  }

  addCategory(data: Partial<CategoryDto>): Observable<CategoryDto> {
    return this.http.post<CategoryDto>(this.base, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/${id}`);
  }
}
