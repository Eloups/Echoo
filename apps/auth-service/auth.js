import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
    host: "172.18.0.1",
    port: 5432,
    user: "root",
    password: "5432",
    database: "test",
});

export const auth = betterAuth({
    database: pool,
});
