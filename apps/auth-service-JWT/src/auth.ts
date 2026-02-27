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
    requireEmailVerification: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url, token }, request) => {
      // Only send reset password email if email has been verified
      if (!user.emailVerified) {
        throw new Error("Email must be verified before resetting password");
      }
      
      url = `${WEB_SERVICE_AUTHENTIFICATION_URL}/reset-password/${token}`;
      await sendEmail({
        to: user.email,
        URL_RESET_PASSWORD: url,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: false,
    sendVerificationEmail: async ({ user, url, token }, request) => {

      // L'URL pointera vers votre site web
      url = `${WEB_SERVICE_AUTHENTIFICATION_URL}/verify-email/${token}`;
      await sendEmail({
        to: user.email,
        URL_VERIFICATION: url,
      });
    },
  },
  jwt: {
    expirationTime: 3600, // 1 hour en secondes
  },
  advanced: {
    disableCSRFCheck: true,
  },
  trustedOrigins: ['http://localhost:3000'],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [jwtPlugin, openAPI()],
});