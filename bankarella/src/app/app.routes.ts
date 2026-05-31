import { Routes } from '@angular/router';
import { Simulation } from './simulation/simulation';
import { LandingPage } from './landing-page/landing-page';

export const routes: Routes = [
    { path: 'simulation', component: Simulation },
    { path: '', component: LandingPage }
];
