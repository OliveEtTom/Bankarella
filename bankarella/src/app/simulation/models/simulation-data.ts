export class SimulationData {
    constructor(public name: string,
        public amount: number,
        public interestRate: number,
        public duration: number,
        public insurance?: number) {

    }
}