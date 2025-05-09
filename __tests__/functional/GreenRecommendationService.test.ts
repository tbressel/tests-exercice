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

















});