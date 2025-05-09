/**
 * The main server file for the React_Node application.
 * @module index
 */

// Express importation
import express, { Request, Response } from 'express';
const server = express();

import dotenv from 'dotenv';
dotenv.config();

import { Router } from 'express';
const router = Router();


import { GreenRecommendationService } from "./Classes/GreenRecommendationService";
const service = new GreenRecommendationService();

import { TransportConfig, TransportType } from './Config/TransportConfig'; 
const config = new TransportConfig();


// http://localhost:3000/api/suggested-transport?distance=10&weight=10&deadline=1
router.get('/suggested-transport', (req: Request, res: any) => {
    const { distance, weight, deadline } = req.query;

    if (!distance || !weight || !deadline) {
      return res.status(400).json({ error: 'Missing query parameters: distance, weight, deadline' });
    }

    try {
      const transport = service.getSuggestedTransport(
        Number(distance),
        Number(weight),
        Number(deadline)
      );
      res.json({ suggested: transport });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
});

//http://localhost:3000/api/transport-types
router.get('/transport-types', (req: Request, res: Response) => {
    try {
        const transportTypes = config.getTransportType();
        res.json({ transportTypes });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

//http://localhost:3000/api/average-speed?type=BIKE
router.get('/average-speed', (req: Request, res: any) => {
    console.log(req.query)
    const { type } = req.query;

    if (!type) {
        return res.status(400).json({ error: 'Missing query parameter: type' });
    }

    try {
        const speed = config.getAverageSpeed(type as string as any);
        res.json({ speed });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});














server.use(express.json());
server.use('/api', router);
server.listen(3000, () => {
    console.log(`Server running on port ${3000}`);
});

export default router;
