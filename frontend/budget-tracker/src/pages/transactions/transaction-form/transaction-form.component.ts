import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { TransactionService, TransactionDto } from '../../../services/transaction.service';
import { CategoryService } from '../../../services/category.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private txService = inject(TransactionService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);

  categories: any[] = [];
  noCategories = false;

  // main transaction form
  form = this.fb.group({
    categoryId: [undefined as any, Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    date: [new Date().toISOString().slice(0, 10), Validators.required],
    description: [''],
    type: ['expense', Validators.required],
  });

  // inline category add form
  categoryForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    type: ['expense', Validators.required],
  });

  id?: number;
  loading = false;
  isEdit = false;

  ngOnInit(): void {
    this.loadCategories();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.loadTransaction(this.id);
    }
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res || [];
        this.noCategories = this.categories.length === 0;
      },
      error: (err) => {
        console.error('Error loading categories', err);
        this.categories = [];
        this.noCategories = true;
      },
    });
  }

  private loadTransaction(id: number) {
    this.loading = true;
    this.txService.get(id).subscribe({
      next: (tx) => {
        const d = tx.date ? tx.date.slice(0, 10) : new Date().toISOString().slice(0, 10);
        this.form.patchValue({
          categoryId: tx.categoryId,
          amount: tx.amount,
          date: d,
          description: tx.description,
          type: tx.type,
        });
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  addCategoryInline() {
    if (this.categoryForm.invalid) return;
    const data = this.categoryForm.value;

    this.categoryService.addCategory(data).subscribe({
      next: () => {
        this.categoryForm.reset({ type: 'expense' });
        this.loadCategories();
        alert('Category added successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add category');
      },
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;

    const payload: TransactionDto = {
      categoryId: Number(this.form.value.categoryId),
      amount: Number(this.form.value.amount),
      date: this.form.value.date ?? new Date().toISOString().slice(0, 10),
      description: this.form.value.description ?? undefined,
      type: (this.form.value.type ?? 'expense') as 'income' | 'expense',
    };

    const request$: Observable<any> =
      this.isEdit && this.id
        ? this.txService.update(this.id, payload)
        : this.txService.create(payload);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/transactions']);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        alert(err?.error?.message || 'Save failed');
      },
    });
  }

  cancel() {
    this.router.navigate(['/transactions']);
  }
}
