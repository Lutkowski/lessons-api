import {db} from "../client/client.js";

export const lessonsRepository = {
    async getLessons(dto) {
        const {
            dateFrom,
            dateTo,
            status,
            teacherIds,
            studentsCountFrom,
            studentsCountTo,
            limit,
            offset
        } = dto;

        const baseQuery = db("lessons").select("lessons.id");

        if (dateFrom && dateTo) {
            if (dateFrom === dateTo) {
                baseQuery.where("lessons.date", dateFrom);
            } else {
                baseQuery.whereBetween("lessons.date", [dateFrom, dateTo]);
            }
        }

        if (status !== undefined) {
            baseQuery.where("lessons.status", status);
        }

        if (teacherIds) {
            baseQuery.whereIn(
                "lessons.id",
                db("lesson_teachers")
                    .select("lesson_id")
                    .whereIn("teacher_id", teacherIds)
            );
        }

        if (studentsCountFrom !== undefined && studentsCountTo !== undefined) {
            baseQuery.whereIn(
                "lessons.id",
                db("lessons")
                    .leftJoin("lesson_students", "lesson_students.lesson_id", "lessons.id")
                    .groupBy("lessons.id")
                    .havingRaw(
                        "COUNT(lesson_students.student_id) BETWEEN ? AND ?",
                        [studentsCountFrom, studentsCountTo]
                    )
                    .select("lessons.id")
            );
        }


        baseQuery.orderBy("lessons.id", "asc");
        baseQuery.limit(limit).offset(offset);

        const lessonIds = (await baseQuery).map((row) => row.id);

        if (lessonIds.length === 0) {
            return [];
        }

        return db("lessons")
            .select(
                "lessons.id as lessons_id",
                db.raw("TO_CHAR(lessons.date, 'YYYY-MM-DD') as lesson_date"),
                "lessons.title as lesson_title",
                "lessons.status as lesson_status",
                "students.id as student_id",
                "students.name as student_name",
                "lesson_students.visit as visit",
                "teachers.id as teacher_id",
                "teachers.name as teacher_name"
            )
            .leftJoin("lesson_students", "lesson_students.lesson_id", "lessons.id")
            .leftJoin("students", "students.id", "lesson_students.student_id")
            .leftJoin("lesson_teachers", "lesson_teachers.lesson_id", "lessons.id")
            .leftJoin("teachers", "teachers.id", "lesson_teachers.teacher_id")
            .whereIn("lessons.id", lessonIds);
    },
};
