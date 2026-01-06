import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

// fallback to local IP if EXPO_PUBLIC_API_AUTH_URL is not set
const DEFAULT_API = "http://192.168.1.57:3333";
const baseURL = DEFAULT_API;

export const authClient = createAuthClient({
  baseURL,
  plugins: [jwtClient()],
});