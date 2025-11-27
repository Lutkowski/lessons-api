export function mapLessonsResponse(rows) {
    const lessonsMap = new Map();

    for (const row of rows) {
        const lessonId = row.lessons_id;

        if (!lessonsMap.has(lessonId)) {
            lessonsMap.set(lessonId, {
                id: lessonId,
                date: row.lesson_date,
                title: row.lesson_title,
                status: row.lesson_status,
                visitCount: 0,
                students: [],
                teachers: []
            });
        }

        const lesson = lessonsMap.get(lessonId);

        if (row.student_id !== null) {
            if (!lesson.students.some(s => s.id === row.student_id)) {
                lesson.students.push({
                    id: row.student_id,
                    name: row.student_name,
                    visit: row.visit
                });

                if (row.visit === true) {
                    lesson.visitCount++;
                }
            }
        }

        if (row.teacher_id !== null) {
            if (!lesson.teachers.some(teacher => teacher.id === row.teacher_id)) {
                lesson.teachers.push({
                    id: row.teacher_id,
                    name: row.teacher_name
                });
            }
        }
    }

    return Array.from(lessonsMap.values());
}
