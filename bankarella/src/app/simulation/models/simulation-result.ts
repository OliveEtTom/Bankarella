export class SimulationResult {
    constructor(public monthlyPayment: number,
        public graph:
            { data: any[]; layout: { width: number; height: number; title: string } }) { }
}