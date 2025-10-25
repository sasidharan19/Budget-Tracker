import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const svg = d3.select(this.el.nativeElement)
      .append('svg')
      .attr('width', 300)
      .attr('height', 200);

    svg.append('circle')
      .attr('cx', 150)
      .attr('cy', 100)
      .attr('r', 50)
      .style('fill', 'steelblue');
  }
}
