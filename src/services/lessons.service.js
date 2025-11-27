import {lessonsRepository} from "../repositories/lessonsRepository.js";
import {mapLessonsFilters} from "../mappers/lessons.mapper.js";

export const lessonsService = {
    async getLessons(validatedQuery) {
        const dto = mapLessonsFilters(validatedQuery);
        return await lessonsRepository.getLessons(dto);
    }
}