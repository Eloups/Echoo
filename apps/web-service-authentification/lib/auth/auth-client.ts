import { createAuthClient } from "better-auth/react";

const AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL

export const authClient = createAuthClient({
  baseURL: AUTH_URL,
  plugins: [],
});