import express from 'express';
import { homePage } from '../controllers/controller.js';

const routes = express.Router();

routes.get('/', homePage);

export default routes;
