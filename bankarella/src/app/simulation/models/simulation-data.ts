export class SimulationData {
    constructor(public name: string,
        public amount: number,
        public rate: number,
        public duration: number,
        public insurance?: number) {

    }
}