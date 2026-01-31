import { betterAuth } from "better-auth";
import { jwt, openAPI } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendEmail } from "./email";

export const jwtPlugin = jwt();

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log("user", { user });
      console.log("url", { url });
      console.log("token", { token });
      console.log("request", { request });
      
      console.log("sendResetPassword called with:", { user, url, token });
      await sendEmail({
        to: user.email,
      });
    },
  },
  jwt: {
    // configuration de la date d'expiration du token JWT
    // de base c'est 15 minutes (900 secondes)
    expirationTime: 3600, // 1 hour en secondes
  },
  advanced: {
    // À ne pas laisser en prod ! // sa désactive la vérification de l'origine des requêtes
    disableOriginCheck: true,
  },
  trustedOrigins: ['http://localhost:3001'],
  // trustedOrigins: ['*'],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [jwtPlugin, openAPI()],
});
