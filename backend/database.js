import { postgres } from "./deps.js";

export const sql = postgres({
    user: 'postgres',
    database: 'postgres',
    password: '3angiangLX1#',
    hostname: 'localhost',
    port: 8000,
    max: 2
});
