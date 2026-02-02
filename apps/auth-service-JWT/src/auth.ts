import { betterAuth } from "better-auth";
import { jwt, openAPI } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendEmail } from "./email";

export const jwtPlugin = jwt();

const WEB_SERVICE_AUTHENTIFICATION_URL = process.env.WEB_SERVICE_AUTHENTIFICATION_URL;

export const auth = betterAuth({
  baseURL: "http://localhost:3333",
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      url = `${WEB_SERVICE_AUTHENTIFICATION_URL}/reset-password/${token}`;
      await sendEmail({
        to: user.email,
        URL_RESET_PASSWORD: url,
      });
    },
  },
  jwt: {
    expirationTime: 3600, // 1 hour en secondes
  },
  trustedOrigins: ['http://localhost:3000'],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [jwtPlugin, openAPI()],
});