import { TestBed } from '@angular/core/testing';

import { SimulationService } from './simulation.service';
import { SimulationData } from '../simulation/models/simulation-data';

describe('SimulationService', () => {
    let service: SimulationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SimulationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have a method that returns the monthly payment', () => {
        const simulationData = new SimulationData('Simulation 1', 92000, 2.2, 180, 1.53);
        expect(service.computeMonthlyPayment(simulationData)).toBeCloseTo(600.54, 2);
    });
});