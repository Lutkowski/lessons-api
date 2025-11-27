import Joi from "joi";

const dateRegexp = /^\d{4}-\d{2}-\d{2}$/;

const commaSeparatedNumbersRegexp = /^\d+(,\d+)*$/;

export const lessonsQuerySchema = Joi.object({
    date: Joi.string()
        .custom((value, helpers) => {
            const parts = value.split(',');
            if (parts.length > 2) return helpers.error('any.invalid');

            for (const part of parts) {
                if (!dateRegexp.test(part)) return helpers.error('any.invalid');
            }

            return value;
        })
        .optional(),
    status: Joi.number().valid(0, 1).optional(),
    teacherIds: Joi.string().pattern(commaSeparatedNumbersRegexp).optional(),
    studentsCount: Joi.string().pattern(commaSeparatedNumbersRegexp).optional(),
    page: Joi.number().integer().min(1).default(1),
    lessonsPerPage: Joi.number().integer().min(1).default(5),
})
