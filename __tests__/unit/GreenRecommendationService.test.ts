import { GreenRecommendationService } from '../../src/Classes/GreenRecommendationService';
import type { TransportType } from "../../src/Config/TransportConfig";
import { TransportConfig } from "../../src/Config/TransportConfig";




describe('Testing getSuggestedTransport, isDeadlineFeasible and calculateTimeEstimation intro GreenRecommendationService class', () => {
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

    // NOT Valide if it returns true
    it('should return false if estimation up to the deadline', () => {
        const type: TransportType = 'BIKE';
        const distance = 1000;
        const deadline = 0.1;
        expect(service.isDeadlineFeasible(type, distance, deadline)).toBe(false);
    });



    // NOT valide if parameters are not in the right type
    it('should throw if distance or deadline is invalid', () => {
        const type: TransportType = 'BIKE';
        let distance: number = -69;
        let deadline: number = 10;
        expect(() => service.isDeadlineFeasible(type, distance, deadline)).toThrow();

        distance = 10;
        deadline = -666;
        expect(() => service.isDeadlineFeasible(type, distance, deadline)).toThrow();

        distance = NaN;
        deadline = 10;
        expect(() => service.isDeadlineFeasible(type, distance, deadline)).toThrow();

        distance = 10;
        deadline = NaN;
        expect(() => service.isDeadlineFeasible(type, distance, deadline)).toThrow();
    });


    // Valide (true) if parameters permit to get a Valide transport type
    it('should return a valid transport type  if conditions are good', () => {
        const distance = 10;
        const weight = 5;
        const deadline = 10;
        const suggestion = service.getSuggestedTransport(distance, weight, deadline);
        const allTransports = transportConfig.getTransportType();
        expect(allTransports.includes(suggestion)).toBe(true);
    });


    // NOT Valide (false) if parameters don't permit to get a Valide transport type
    it('should throw an Error if no transport return', () => {
        const distance = 666666;
        const weight = 123456;
        const deadline = 0.000000001;
        expect(() => service.getSuggestedTransport(distance, weight, deadline)).toThrow("No transport found for these given parameters.");
    });


      



})
