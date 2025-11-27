import {lessonsRepository} from "../repositories/lessonsRepository.js";
import {mapLessonsFilters} from "../mappers/lessons/lessons-filter.mapper.js";
import {mapLessonsResponse} from "../mappers/lessons/lessons-response.mapper.js";

export const lessonsService = {
    async getLessons(validatedQuery) {
        const dto = mapLessonsFilters(validatedQuery);
        const rows = await lessonsRepository.getLessons(dto);
        return mapLessonsResponse(rows);
    }
}