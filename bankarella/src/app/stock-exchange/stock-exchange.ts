import { Component } from '@angular/core';
import { PlotlyModule } from "angular-plotly.js";
import { Cac40Service, RecordItem } from '../services/cac40.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  /*selector: 'app-stock-exchange',
  imports: [],
  templateUrl: './stock-exchange.html',
  styleUrl: './stock-exchange.scss',*/
  selector: 'app-stock-exchange',
  template: '<plotly-plot [data]="graph.data" [layout]="graph.layout"></plotly-plot>',
  imports: [PlotlyModule],

})
export class StockExchange {
  // declare properties (no type annotations on `this.` inside constructor)
  data: Observable<RecordItem[]>;
  x: Observable<Date[]>;
  y: Observable<(number | null)[]>;
  graph: { data: any[]; layout: { width: number; height: number; title: string } };

  constructor(private cac40Service: Cac40Service) {
    console.log('StockExchange component initialized');
    this.data = this.cac40Service.getHistory();
    this.x = this.data.pipe(map(items => items.map(item => item.date)));
    this.y = this.data.pipe(map(items => items.map(item => item.volume)));

    // initialize graph with safe defaults so template can bind immediately
    this.graph = {
      data: [],
      layout: { width: -1, height: -1, title: 'A Fancy Plot' }
    };

    // subscribe to concrete data arrays and update Plotly data with real arrays
    this.data.subscribe(items => {
      const xs = items.map(item => item.date);
      const ys = items.map(item => item.close);
      this.graph.data = [{ x: xs, y: ys, type: 'scatter', mode: 'lines+points', marker: { color: 'red' } }];
    });
  }
}
