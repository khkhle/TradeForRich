import { postgres } from "./deps.js";

export const sql = postgres({
    user: 'postgres',
    database: 'postgres',
    password: 'your password',
    hostname: 'localhost',
    port: 8000,
    max: 2
});
