import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
    host: "database",
    port: 5432,
    user: "postgres",
    password: "root",
    database: "echoo",
});

export const auth = betterAuth({
    database: pool,
});


