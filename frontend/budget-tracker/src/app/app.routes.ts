import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { TransactionsComponent } from '../pages/transactions/transactions.component';
import { BudgetComponent } from '../pages/budget/budget.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'budget', component: BudgetComponent },
];
