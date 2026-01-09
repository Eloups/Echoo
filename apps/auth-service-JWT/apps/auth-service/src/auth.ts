import { betterAuth } from "better-auth";
import { jwt, openAPI } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
// create and export the jwt plugin instance so it can be used with proper types elsewhere
export const jwtPlugin = jwt();

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  jwt: {
    // configuration de la date d'expiration du token JWT
    // de base c'est 15 minutes (900 secondes)
    expirationTime: 3600, // 1 hour en secondes
  },
  advanced: {
    disableOriginCheck: true, // À ne pas laisser en prod !
  },
  trustedOrigins: ['http://localhost:3001'],
  // trustedOrigins: ['*'],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [jwtPlugin, openAPI()],
});
