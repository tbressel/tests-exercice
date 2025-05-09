import { CarbonCalculator } from "../../src/Classes/CarbonCalculator";
import type { TransportType } from "../../src/Config/TransportConfig";
import { TransportConfig } from "../../src/Config/TransportConfig";

describe('Testing validateInputs for calculateEmission intro CarbonCalculator class', () => {
    let calculator: CarbonCalculator;
    let transportType: TransportConfig;

    beforeEach(() => {
        calculator = new CarbonCalculator();
        transportType = new TransportConfig();
    });

    // A valid transport type
    it('should\'nt throw an Error for BIKE data', () => {
        const type: TransportType = 'BIKE';
        const distance: number = 10;
        const weight: number = 5;
        expect(() => calculator.calculateEmission(type, distance, weight)).not.toThrow();
    });

    // An invalid transport type
    it('SHOULD throw an Error for DELTA_PLANE data', () => {
        const type: any = 'DELTA_PLANE'; // do I test typescript or not here ??
        const distance: number = 50;
        const weight: number = 50;
        expect(() => calculator.calculateEmission(type, distance, weight)).toThrow();
    });

    // NOT a valide distance
    it('should throw an Error if distance is zero or negative', () => {
        const type: TransportType = 'BIKE';
        let distance: number = 0;
        let weight: number = 10;
        expect(() => calculator.calculateEmission(type, distance, weight)).toThrow("Distance must be a zero or up to zero.");
        
        distance = -155;
        weight = 10;
        expect(() => calculator.calculateEmission(type, distance, weight)).toThrow("Distance must be a zero or up to zero.");
    });

    // NOT a valide weight
    it('should throw an Error if weight is negative', () => {
        const type: TransportType = 'BIKE';
        let distance: number = 10;
        let weight: number = -66;
        expect(() => calculator.calculateEmission(type, distance, weight)).toThrow("Weight must be a up to zero.");
    });

});
