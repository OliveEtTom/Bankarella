import { Injectable } from '@angular/core';
import { SimulationData } from '../simulation/models/simulation-data';

@Injectable({
    providedIn: 'root'
})
export class SimulationService {
    computeMonthlyPayment(simulationData: SimulationData): number {
        const { amount, interestRate, duration } = simulationData;
        const monthlyInterestRate = interestRate / 100 / 12;
        const numberOfPayments = duration;
        return amount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    }
}