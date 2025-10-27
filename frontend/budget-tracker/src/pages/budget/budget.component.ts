import { Component, inject, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../services/budget.service';
import { SummaryService } from '../../services/summary.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import * as d3 from 'd3';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './budget.component.html'
})
export class BudgetComponent implements OnInit, OnDestroy {
  private budgetService = inject(BudgetService);
  private summaryService = inject(SummaryService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    month: [new Date().toISOString().slice(0,7), Validators.required],
    amount: [0, [Validators.required, Validators.min(0)]]
  });

  budget: any = null;
  summary: any = null;
  loading = false;

  @ViewChild('barChart', { static: false }) barChartRef!: ElementRef;
  private svg: any = null;

  ngOnInit() {
    this.load();
  }
  ngOnDestroy() { this.destroyChart(); }

  load() {
    const month = this.form.value.month ?? '';
    this.loading = true;
    this.budgetService.getBudget(month).subscribe({
      next: b => {
        this.budget = b;
        // load summary to get actual expenses
        this.summaryService.getSummary(month).subscribe(s => {
          this.summary = s;
          this.loading = false;
          setTimeout(()=> this.drawBar(), 0);
        }, () => this.loading = false);
      },
      error: () => this.loading = false
    });
  }

  save() {
    if (this.form.invalid) return;
    this.loading = true;
    const month = (this.form.value.month ?? '').toString();
    const payload = { month, amount: Number(this.form.value.amount) };
    this.budgetService.upsertBudget(payload).subscribe({
      next: (b) => {
        this.budget = b;
        this.loading = false;
        this.load();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  private destroyChart() {
    if (this.svg) { this.svg.remove(); this.svg = null; }
  }

  private drawBar() {
    this.destroyChart();
    if (!this.barChartRef) return;
    const container = this.barChartRef.nativeElement;
    const width = 450, height = 250, margin = {top:20, right:20, bottom:40, left:60};
    const data = [
      { label: 'Budget', value: this.budget?.amount ?? 0 },
      { label: 'Actual Expense', value: this.summary?.expense ?? 0 }
    ];

    const svg = d3.select(container).append('svg').attr('width', width).attr('height', height);
    this.svg = svg;
    const x = d3.scaleBand().domain(data.map(d=>d.label)).range([margin.left, width - margin.right]).padding(0.4);
    const y = d3.scaleLinear().domain([0, d3.max(data, d=>d.value)! * 1.2 || 100]).nice().range([height - margin.bottom, margin.top]);

    svg.append('g').selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d=> x(d.label)!)
      .attr('y', d=> y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d=> y(0) - y(d.value))
      .attr('fill', (d,i)=> i===0 ? '#4f46e5' : '#ef4444');

    svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g').attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }
}
