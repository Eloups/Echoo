import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

const AUTH_URL = process.env.EXPO_PUBLIC_API_AUTH_URL

export const authClient = createAuthClient({
  baseURL: AUTH_URL,
  plugins: [jwtClient()],
});