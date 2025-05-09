/**
 * The main server file for the React_Node application.
 * @module index
**/
// Express importation
import express, { Express } from "express";
const server: Express = express();
server.use(express.json());

// Color importation
import { color } from './config';



export default server;





