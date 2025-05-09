import { GreenRecommendationService } from '../../src/Classes/GreenRecommendationService';
import type { TransportType } from "../../src/Config/TransportConfig";
import { TransportConfig } from "../../src/Config/TransportConfig";




describe('Testing getEmissionFactor, validateInputs and calculateEmission intro CarbonCalculator class', () => {
    let service: GreenRecommendationService;
    let config: TransportConfig;


    beforeEach(() => {
        service = new GreenRecommendationService();
        config = new TransportConfig();
    });



    it('should throw an Error if distance is a number typed NaN or other type', () => {
        const type: TransportType = 'BIKE';
        let distance: number = NaN;
        expect(() => service.calculateTimeEstimation(distance, type)).toThrow();

        distance = "Mouahaha" as any;
        expect(() => service.calculateTimeEstimation(distance, type)).toThrow();
    });




    it('should throw an Error if distance is 0 or negative', () => {
        const type: TransportType = 'BIKE';
        let distance: number = 0;

        expect(() => service.calculateTimeEstimation(distance, type)).toThrow();

        distance = -65;
        expect(() => service.calculateTimeEstimation(distance, type)).toThrow();
    });






})
