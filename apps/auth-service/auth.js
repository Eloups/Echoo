import { betterAuth } from "better-auth"

export const auth = betterAuth({
    baseURL: process.env.APP_URL,
    secret: process.env.BETTER_AUTH_SECRET,
})