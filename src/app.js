import express from 'express';
import {lessonsRouter} from "./routes/lessons.routes.js";

export const app = express();

app.use(express.json());

app.use('/lessons', lessonsRouter);
