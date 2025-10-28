import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService, CategoryDto } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ added CommonModule
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);

  categories: CategoryDto[] = [];
  categoryForm!: FormGroup;
  loading = false;

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      type: ['expense', Validators.required],
    });
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  addCategory() {
    if (this.categoryForm.invalid) return;
    const data = this.categoryForm.value;
    this.categoryService.addCategory(data).subscribe({
      next: () => {
        this.categoryForm.reset({ type: 'expense' });
        this.loadCategories();
      },
    });
  }

  deleteCategory(id: number) {
    if (!confirm('Delete this category?')) return;
    this.categoryService.deleteCategory(id).subscribe({
      next: () => this.loadCategories(),
    });
  }
}
