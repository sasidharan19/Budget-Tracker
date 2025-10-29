import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryService, SummaryDto } from '../../services/summary.service';
import { formatCurrency, DecimalPipe } from '@angular/common';
import * as d3 from 'd3';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  private summaryService = inject(SummaryService);
  month = new Date().toISOString().slice(0, 7); // YYYY-MM default to current month
  summary?: SummaryDto;
  loading = false;

  @ViewChild('pieChart', { static: false })
  pieChartRef!: ElementRef<HTMLDivElement>;
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null =
    null;

  ngOnInit() {
    this.load();
  }
  ngAfterViewInit() {
    /* chart drawn after load */
  }
  ngOnDestroy() {
    this.destroyChart();
  }

  load() {
    this.loading = true;
    this.summaryService.getSummary(this.month).subscribe({
      next: (s) => {
        this.summary = s;
        this.loading = false;
        setTimeout(() => this.drawPieChart(), 0);
      },
      error: () => (this.loading = false),
    });
  }

  onMonthChange(e: any) {
    this.month = e.target.value;
    this.load();
  }

  // D3 pie chart
  private destroyChart() {
    if (this.svg) {
      this.svg.remove();
      this.svg = null;
    }
  }

  private drawPieChart() {
    this.destroyChart();
    if (!this.summary) return;
    const data = this.summary.byCategory ?? [];
    if (data.length === 0) return;

    const container = this.pieChartRef?.nativeElement;
    if (!container) return;

    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    this.svg = d3.select(container).select('svg');

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie<any>().value((d: any) => d.amount);
    const arc = d3
      .arc<any>()
      .innerRadius(0)
      .outerRadius(radius - 10);

    const arcs = svg.selectAll('arc').data(pie(data)).enter().append('g');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any, i: number) => color(String(i)))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1);

    arcs
      .append('text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .text((d: any) => (d.data.categoryName ? `${d.data.categoryName}` : ''));

    // legend
    const legend = d3
      .select(container)
      .append('div')
      .style('margin-top', '24px')
      .style('padding-top', '12px')
      .style('border-top', '1px solid #eee')

    legend
      .selectAll('div')
      .data(data)
      .enter()
      .append('div')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('gap', '8px')
      .style('font-size', '13px')
      .each(function (d: any, i) {
        const el = d3.select(this);
        el.append('div')
          .style('width', '12px')
          .style('height', '12px')
          .style('background', color(String(i)));
        el.append('div').text(`${d.categoryName} — ${d.amount}`);
      });
  }
}
