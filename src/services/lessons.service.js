import {lessonsRepository} from "../repositories/lessonsRepository.js";

export const lessonsService = {
    async getLessons(filters) {
        return await lessonsRepository.getLessons(filters);
    }
}