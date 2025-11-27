import {Router} from 'express';
import {lessonsController} from "../controllers/lessons.controller.js";
import {validateQuery} from "../middlewares/validate.js";
import {lessonsQuerySchema} from "../validation/lessons.validation.js";

export const lessonsRouter = Router();

lessonsRouter.get('/', validateQuery(lessonsQuerySchema), lessonsController.getLessons);
