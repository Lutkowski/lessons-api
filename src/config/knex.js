import {config} from "./env.js";

export const knexConfig = {
    client: 'pg',
    connection: config.databaseConnectionString,
}