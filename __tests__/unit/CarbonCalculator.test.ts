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

    /**
     * Test that do not return an Error with valide datas
     */
    it('should\'nt throw an Error for BIKE data', () => {
        const type: TransportType = 'BIKE';
        const distance: number = 10;
        const weight: number = 5;
        expect(() => calculator.calculateEmission(type, distance, weight)).not.toThrow();
    });

    it('SHOULD throw an Error for DELTA_PLANE data', () => {
        const type: any = 'DELTA_PLANE'; // do I test typescript or not here ??
        const distance: number = 50;
        const weight: number = 50;
        expect(() => calculator.calculateEmission(type, distance, weight)).toThrow();
    });

});
