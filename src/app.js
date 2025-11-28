import express from 'express';
import {lessonsRouter} from "./routes/lessons.routes.js";
import {errorHandler} from "./middlewares/error-handler.js";

export const app = express();

app.use(express.json());

app.use('/lessons', lessonsRouter);

app.use(errorHandler);