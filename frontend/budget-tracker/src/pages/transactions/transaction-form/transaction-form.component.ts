import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService, TransactionDto } from '../../../services/transaction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private txService = inject(TransactionService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.group({
    categoryId: [undefined as any, Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    date: [new Date().toISOString().slice(0, 10), Validators.required],
    description: [''],
    type: ['expense', Validators.required],
  });

  id?: number;
  loading = false;
  isEdit = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.loadTransaction(this.id);
    }
  }

  loadTransaction(id: number) {
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
