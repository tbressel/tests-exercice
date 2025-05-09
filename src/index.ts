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

import { TransportConfig } from './Config/TransportConfig'; 
const config = new TransportConfig();



// Définition des routes
router.get('/suggested-transport', (req: any, res: any) => {
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



















server.use(express.json());
server.use('/api', router);
server.listen(3000, () => {
    console.log(`Server running on port ${3000}`);
});

export default router;
