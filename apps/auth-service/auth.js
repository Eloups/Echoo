import { betterAuth } from "better-auth"

export const auth = betterAuth({
    database: createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "test",
    }), 
})