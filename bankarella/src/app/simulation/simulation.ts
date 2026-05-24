import { Component, Input, OnInit } from '@angular/core';
import { SimulationData } from './models/simulation-data';
import { TitleCasePipe, CurrencyPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-simulation',
  imports: [TitleCasePipe, CurrencyPipe, PercentPipe],
  templateUrl: './simulation.html',
  styleUrl: './simulation.scss',
})
export class Simulation implements OnInit {
  @Input() data!: SimulationData;
  constructor() { }

  ngOnInit(): void {
    this.data = new SimulationData('Simulation 1', 92000, 2.2, 180, 1.53);
  }
}