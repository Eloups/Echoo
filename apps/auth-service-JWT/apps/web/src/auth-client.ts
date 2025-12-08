import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.AUTH_SERVICE_URL,
  plugins: [
    jwtClient(),
  ]
})