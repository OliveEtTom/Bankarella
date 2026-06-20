import { Component, Input, OnInit } from '@angular/core';
import { SimulationData } from './models/simulation-data';
import { TitleCasePipe, CurrencyPipe, PercentPipe } from '@angular/common';
import { SimulationService } from '../services/simulation.service';
import { PlotlyModule } from "angular-plotly.js";

@Component({
  selector: 'app-simulation',
  imports: [TitleCasePipe, CurrencyPipe, PercentPipe, PlotlyModule],
  templateUrl: './simulation.html',
  styleUrl: './simulation.scss',
})
export class Simulation implements OnInit {
  @Input() data!: SimulationData;
  @Input() graph: { data: any[]; layout: { width: number; height: number; title: string } };
  computing: boolean = false;
  computedMonthlyPayment?: number | null = null;
  constructor() {
    this.graph = {
      data: [
        { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: { color: 'red' } },
        { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
      ],
      layout: { width: 320, height: -1, title: 'A Fancy Plot' }
    };
  }

  ngOnInit(): void {
    this.data = new SimulationData('Simulation 1', 92000, 2.2, 180, 1.53);
    const simulationService = new SimulationService();
    this.graph = {
      data: [
        { x: Array.from(Array(this.data.duration).keys()), y: simulationService.computeAllPayments(this.data), type: 'scatter', mode: 'lines+points', marker: { color: 'red' } },
      ],
      layout: { width: -1, height: -1, title: 'A Fancy Plot' }
    };
  }

  monthlyPayment(): number {
    if (this.computedMonthlyPayment != null) return this.computedMonthlyPayment;
    const simulationService = new SimulationService();
    return simulationService.computeMonthlyPayment(this.data);
  }

  computeMonthlyPayment(): void {
    if (this.computing) return;
    this.computing = true;
    // small UX delay to show spinner; replace with real async work if available
    setTimeout(() => {
      const simulationService = new SimulationService();
      this.computedMonthlyPayment = simulationService.computeMonthlyPayment(this.data);
      this.computing = false;
    }, 100);
  }
}