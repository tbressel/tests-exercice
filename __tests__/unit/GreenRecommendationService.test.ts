import { GreenRecommendationService } from '../../src/Classes/GreenRecommendationService';
import type { TransportType } from "../../src/Config/TransportConfig";
import { TransportConfig } from "../../src/Config/TransportConfig";




describe('Testing getEmissionFactor, validateInputs and calculateEmission intro CarbonCalculator class', () => {
    let service: GreenRecommendationService;
    let transportConfig: TransportConfig;


    beforeEach(() => {
        service = new GreenRecommendationService();
        transportConfig = new TransportConfig();
    });


    // NOT a valide number (testing the famous number : NaN ! in differente parameters and different types) 
    it('should throw an Error if distance is a number typed NaN or other type', () => {
        const type: TransportType = 'BIKE';
        let distance: number = NaN;
        expect(() => service.calculateTimeEstimation(distance, type)).toThrow();

        distance = "Mouahaha" as any;
        expect(() => service.calculateTimeEstimation(distance, type)).toThrow();
    });



    // NOT a valide data with 0 or negative
    it('should throw an Error if distance is 0 or negative', () => {
        const type: TransportType = 'BIKE';
        let distance: number = 0;
        expect(() => service.calculateTimeEstimation(distance, type)).toThrow();

        distance = -65;
        expect(() => service.calculateTimeEstimation(distance, type)).toThrow();
    });


    // A valide time if the input is correct
    it('should return correct time for valid input', () => {
        const type: TransportType = 'BIKE';
        const distance = 20;
        const speed = transportConfig.getAverageSpeed(type);
        const expectedTime = Number((distance / speed).toFixed(2));
        expect(service.calculateTimeEstimation(distance, type)).toBe(expectedTime);
    });


    // Valide id it returns true
    it('should return true if estimation is right compared to the deadline', () => {
        const type: TransportType = 'BIKE';
        const distance = 10;
        const deadline = 100;
        expect(service.isDeadlineFeasible(type, distance, deadline)).toBe(true);
    });


})
