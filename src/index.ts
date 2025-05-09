/**
 * The main server file for the React_Node application.
 * @module index
**/
// Express importation
import express, { Express } from "express";
const server: Express = express();
server.use(express.json());

import dotenv from 'dotenv';
dotenv.config();


// Color importation
import { color } from './config';



import { GreenRecommendationService } from './Classes/GreenRecommendationService';
import { TransportConfig } from './Config/TransportConfig';
import { TransportType } from './Config/TransportConfig';
import { CarbonCalculator } from './Classes/CarbonCalculator';


const greenRecommendationService = new GreenRecommendationService();
const carbonCalculator = new CarbonCalculator();
const transportConfig = new TransportConfig();



// Test for calculateTimeEstimation
try {
    const transportType: TransportType = 'ELECTRIC_CAR';
    const distance = 150;
    const time = greenRecommendationService.calculateTimeEstimation(distance, transportType);
    console.log (time)
  } catch (error) {
    if (error instanceof Error) {
        console.error('Error while trying to calculate :', error.message);
    } else {
        console.error('Error while trying to calculate :', error);
    }
  }




// Test for getSuggestedTransport
  try {
    const distance = 150;
    const weight = 50;
    const deadline = 5;
    const suggestedTransport = greenRecommendationService.getSuggestedTransport(distance, weight, deadline);
    console.log(`Transport choosen : ${suggestedTransport}`);
  } catch (error) {
    if (error instanceof Error) {
        console.error('Error while trying to calculate :', error.message);
    } else {
        console.error('Error while trying to calculate :', error);
    }
  }



// Test for calculateEmission
try {
    const distance = 150;
    const weight = 50;
    const emission = carbonCalculator.calculateEmission('GAS_CAR', distance, weight);
    console.log(`estimated CO2 for GAS_CAR : ${emission} kg CO2`);
  } catch (error) {
    if (error instanceof Error) {
        console.error('Error while trying to calculate :', error.message);
    } else {
        console.error('Error while trying to calculate :', error);
    }
}



export default server;





