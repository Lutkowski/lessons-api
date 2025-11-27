import {Router} from 'express';
import {lessonsController} from "../controllers/lessons.controller.js";

export const lessonsRouter = Router();

lessonsRouter.get('/', lessonsController.getLessons);
