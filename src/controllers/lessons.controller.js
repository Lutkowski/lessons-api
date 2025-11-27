import {lessonsService} from "../services/lessons.service.js";

export const lessonsController = {
    async getLessons(req, res) {
        const data = await lessonsService.getLessons();
        res.json(data);
    }
}