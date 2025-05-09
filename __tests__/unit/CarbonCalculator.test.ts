import { CarbonCalculator } from "../../src/Classes/CarbonCalculator";
import type { TransportType } from "../../src/Config/TransportConfig";
import { TransportConfig } from "../../src/Config/TransportConfig";

describe('Testing getEmissionFactor, validateInputs and calculateEmission intro CarbonCalculator class', () => {
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


    // NOT a valide number (testing the famous number : NaN ! in differente parameters and different types) 
    it('should throw an Error if distance or weight is not a number', () => {
        const type: TransportType = 'BIKE';
        let distance: number = NaN;
        let weight: number = 10;
        expect(() => calculator.calculateEmission(type, distance, weight)).toThrow();

        distance = 10;
        weight = NaN;
        expect(() => calculator.calculateEmission(type, distance, weight)).toThrow();

        distance = "bla-bla" as any;
        weight = 10;
        expect(() => calculator.calculateEmission(type, distance, weight)).toThrow();

        distance = 10;
        weight = ["blablabla", "truc muche"] as any;
        expect(() => calculator.calculateEmission(type, distance, weight)).toThrow();
    });


    // NOT a valid weight up to the max limit weight
    it('should throw an Error if weight exceeds allowed max weight for transport type', () => {
        const type: TransportType = 'BIKE';
        const distance: number = 10;
        const maxWeight = transportType.getMaxWeight(type);
        const weight = maxWeight + 10;
        expect(() => calculator.calculateEmission(type, distance, weight)).toThrow(`Weight is not allowed for ${type}`);
    });


    // NOT a valid type of transport if NOT in transport list
    it("should throw an Error for invalid transport type", () => {
        //@ts-expect-error
        expect(() => calculator.getEmissionFactor('DELTA_PLANE')).toThrow();
    });

});
