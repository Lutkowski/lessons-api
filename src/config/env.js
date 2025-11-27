import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
    PG_CONNSTRING: Joi.string().uri().required(),
}).unknown(true)

const {error, value: env} = envSchema.validate(process.env);

if (error) {
    throw new Error(`Validation config error. Message: ${error.message}`);
}

export const config = {
    databaseConnectionString: env.PG_CONNSTRING,
};