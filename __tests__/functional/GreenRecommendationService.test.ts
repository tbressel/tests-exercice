import dotenv from 'dotenv';
dotenv.config();

import { GreenRecommendationService } from '../../src/Classes/GreenRecommendationService';
import { TransportConfig } from '../../src/Config/TransportConfig';



describe('GreenRecommendationService', () => {
    let service: GreenRecommendationService;

    beforeAll(() => {
        service = new GreenRecommendationService();
    });


    test('should suggest the most eco transport based on distance, weight, and deadline', () => {
        const distance = 100;
        const weight = 50;
        const deadline = 5;
        const suggestedTransport = service.getSuggestedTransport(distance, weight, deadline);
        expect(suggestedTransport).toBeDefined();
        const expectedType = 'ELECTRIC_CAR';
        expect(suggestedTransport).toBe(expectedType);
    });



    test('should suggest BIKE if weight is low and deadline ok', () => {
        const distance = 30;
        const weight = 5;
        const deadline = 3;
        const suggestedTransport = service.getSuggestedTransport(distance, weight, deadline);
        const expectedType = 'BIKE';
        expect(suggestedTransport).toBe(expectedType);
    });



    test('should suggest TRUCK if weight exceeds all other max weights', () => {
        const distance = 200;
        const weight = 4000;
        const deadline = 10;
        const suggestedTransport = service.getSuggestedTransport(distance, weight, deadline);
        const expectedType = 'TRUCK';
        expect(suggestedTransport).toBe(expectedType);
    });








});