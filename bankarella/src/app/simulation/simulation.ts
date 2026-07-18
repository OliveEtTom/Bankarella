import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SimulationData } from './models/simulation-data';
import { TitleCasePipe, CurrencyPipe, PercentPipe } from '@angular/common';
import { SimulationService } from '../services/simulation.service';
import { PlotlyModule } from "angular-plotly.js";
import { tap } from 'rxjs/internal/operators/tap';
import { interval } from 'rxjs/internal/observable/interval';
import { take } from 'rxjs/internal/operators/take';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { SimulationResult } from './models/simulation-result';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-simulation',
  imports: [TitleCasePipe, CurrencyPipe, PercentPipe, PlotlyModule, CommonModule, ReactiveFormsModule],
  templateUrl: './simulation.html',
  styleUrl: './simulation.scss',
})

export class Simulation implements OnInit, OnDestroy {

  simulationForm: FormGroup;
  simulationResult$: Observable<SimulationResult> = new Observable<SimulationResult>();
  @Input() data!: SimulationData;
  //private destroy$!: Subject<boolean>;
  simulationService = new SimulationService()

  constructor(private formBuilder: FormBuilder) {
    this.data = new SimulationData('Simulation 1', 92000, 2.2, 180, 1.53);
    this.simulationForm = this.formBuilder.group(
      {
        loanAmount: [this.data.amount, [Validators.required, Validators.min(0)]],
        interestRate: [this.data.interestRate, [Validators.required, Validators.min(0)]],
        duration: [this.data.duration, [Validators.required, Validators.min(1)]],
        insurance: [this.data.insurance, [Validators.required, Validators.min(0)]]
      },
      {
        updateOn: 'blur'
      }
    );

    this.simulationResult$ = this.simulationForm.valueChanges.pipe(
      startWith(this.simulationForm.value),
      map(value => ({
        ...value,
        monthlyPayment: this.simulationService.computeMonthlyPayment(new SimulationData(
          'Simulation 1',
          value.loanAmount,
          value.interestRate,
          value.duration,
          value.insurance
        )),
        graph: this.simulationService.computeGraphData(new SimulationData(
          'Simulation 1',
          value.loanAmount,
          value.interestRate,
          value.duration,
          value.insurance
        ))
      })),
    )
    this.simulationForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }

  ngOnInit(): void {
    //this.destroy$ = new Subject<boolean>();
    /*interval(1000).pipe(
      tap(console.log),
      takeUntil(this.destroy$)
    ).subscribe();*/
  }

  monthlyPayment(): number {
    return this.simulationService.computeMonthlyPayment(this.data);
  }

  /*computeMonthlyPayment(): void {
    if (this.computing) return;
    this.computing = true;
    // small UX delay to show spinner; replace with real async work if available
    setTimeout(() => {
      this.computedMonthlyPayment = this.simulationService.computeMonthlyPayment(this.data);
      this.computing = false;
    }, 100);
  }*/

  /*onComputeMonthlyPayment() {
    this.computeMonthlyPayment();
    this.updateGraph();
  }*/

  ngOnDestroy(): void { /*this.destroy$.next(true);*/ }
}