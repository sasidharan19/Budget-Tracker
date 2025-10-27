import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { TransactionListComponent } from '../pages/transactions/transaction-list/transaction-list.component';
import { TransactionFormComponent } from '../pages/transactions/transaction-form/transaction-form.component';
import { BudgetComponent } from '../pages/budget/budget.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transactions', component: TransactionListComponent },
  { path: 'transactions/new', component: TransactionFormComponent },
  { path: 'transactions/edit/:id', component: TransactionFormComponent },
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
  { path: 'budget', component: BudgetComponent },
];
