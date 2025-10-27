// src/app/transactions/transaction-list.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService, TransactionDto } from '../../../services/transaction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  private txService = inject(TransactionService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  form = this.fb.group({
    from: [''],
    to: [''],
    categoryId: [''],
    minAmount: [''],
    maxAmount: [''],
    type: ['']
  });

  transactions: TransactionDto[] = [];
  page = 1;
  limit = 10;
  total = 0;
  loading = false;

  ngOnInit() {
    // Optional: prefill from query params
    this.load();
  }

  load(page = 1) {
    this.loading = true;
    const filter = {
      page,
      limit: this.limit,
      categoryId: this.form.value.categoryId ? Number(this.form.value.categoryId) : undefined,
      from: this.form.value.from || undefined,
      to: this.form.value.to || undefined,
      minAmount: this.form.value.minAmount ? Number(this.form.value.minAmount) : undefined,
      maxAmount: this.form.value.maxAmount ? Number(this.form.value.maxAmount) : undefined,
      type: this.form.value.type ? (this.form.value.type as 'income' | 'expense') : undefined
    };

    this.txService.list(filter).subscribe({
      next: (res) => {
        this.transactions = res.data;
        this.total = res.meta.total;
        this.page = res.meta.page;
        this.limit = res.meta.limit;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  navigateToNew(): void {
    this.router.navigate(['/transactions', 'new']);
  }

  applyFilters() {
    this.load(1);
  }

  clearFilters() {
    this.form.reset({ from: '', to: '', categoryId: '', minAmount: '', maxAmount: '', type: '' });
    this.load(1);
  }

  edit(id: number) {
    this.router.navigate(['/transactions', 'edit', id]);
  }

  delete(id: number) {
    if (!confirm('Delete this transaction?')) return;
    this.txService.delete(id).subscribe({
      next: () => this.load(this.page),
      error: (err) => alert('Delete failed')
    });
  }

  prev() {
    if (this.page > 1) this.load(this.page - 1);
  }
  next() {
    const pages = Math.ceil(this.total / this.limit);
    if (this.page < pages) this.load(this.page + 1);
  }
}
