export function validateQuery(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        req.validatedQuery = value;
        next();
    };
}
