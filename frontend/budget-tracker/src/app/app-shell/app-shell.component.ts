// src/app/app-shell.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf, NgFor, DatePipe } from '@angular/common';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './app-shell.component.html',
})
export class AppShellComponent {
  private router = inject(Router);
  public auth: AuthService = inject(AuthService);
  mobileOpen = false;

  links = [
    { label: 'Dashboard', path: '/dashboard', icon: this.iconDashboard() },
    { label: 'Transactions', path: '/transactions', icon: this.iconTransactions() },
    { label: 'Budget', path: '/budget', icon: this.iconBudget() },
    { label: 'Categories', path: '/categories', icon: this.iconCategories() },
  ];

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  logout() {
    this.auth.logout();
    // navigate to login
    this.router.navigate(['/login']);
  }

  // simple inline svg icons so you don't need external libs
  private iconDashboard() {
    return `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-4H3v4z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  private iconTransactions() {
    return `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 8v8M16 12H8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  private iconBudget() {
    return `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 8v8M7 4h10v16H7z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  private iconCategories() {
    return `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M4 6h16M4 12h16M4 18h16"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

}
