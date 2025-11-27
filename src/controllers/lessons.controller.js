import {lessonsService} from "../services/lessons.service.js";

export const lessonsController = {
    async getLessons(req, res) {
        try {
            const data = await lessonsService.getLessons(req.validatedQuery);
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: 'Internal server error'});
        }
    }
}