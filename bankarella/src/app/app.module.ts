import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';


@NgModule({
    imports: [
        CommonModule,
        PlotlyModule.forRoot(PlotlyJS)
    ],
    declarations: [],
    providers: []
})
export class AppModule { }