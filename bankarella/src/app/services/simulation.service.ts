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

    computeTotalPayment(simulationData: SimulationData): number {
        const monthlyPayment = this.computeMonthlyPayment(simulationData);
        return monthlyPayment * simulationData.duration;
    }

    computeTotalInterest(simulationData: SimulationData): number {
        const totalPayment = this.computeTotalPayment(simulationData);
        return totalPayment - simulationData.amount;
    }

    computeRemainingBalance(simulationData: SimulationData, paymentsMade: number): number {
        const monthlyPayment = this.computeMonthlyPayment(simulationData);
        const totalPaid = monthlyPayment * paymentsMade;
        return simulationData.duration * monthlyPayment - totalPaid;
    }

    computeAllPayments(simulationData: SimulationData): number[] {
        const { amount, interestRate, duration } = simulationData;
        const monthlyPayment = this.computeMonthlyPayment(simulationData);
        const allPayments: number[] = [];
        for (let i = 0; i < duration; i++) {
            const remainingBalance = this.computeRemainingBalance(simulationData, i);
            allPayments.push(remainingBalance);
        }
        return allPayments;
    }
}