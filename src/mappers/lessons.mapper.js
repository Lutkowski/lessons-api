export function mapLessonsFilters(validatedQuery) {
    const value = validatedQuery;
    const dto = {};

    if (value.date) {
        const parts = value.date.split(',');
        dto.dateFrom = parts[0];
        dto.dateTo = parts[1] ?? parts[0];
    }

    if (value.status !== undefined) {
        dto.status = value.status;
    }

    if (value.teacherIds) {
        dto.teacherIds = value.teacherIds.split(',').map(Number);
    }

    if (value.studentsCount) {
        const parts = value.studentsCount.split(',').map(Number);
        dto.studentsCountFrom = parts[0];
        dto.studentsCountTo = parts[1] ?? parts[0];
    }

    dto.page = value.page;
    dto.lessonsPerPage = value.lessonsPerPage;

    return dto;
}
