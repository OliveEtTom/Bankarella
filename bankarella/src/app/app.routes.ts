import { Routes } from '@angular/router';
import { Simulation } from './simulation/simulation';
import { LandingPage } from './landing-page/landing-page';
import { StockExchange } from './stock-exchange/stock-exchange';

export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'simulation', component: Simulation },
    { path: 'stock-exchange', component: StockExchange }
];
