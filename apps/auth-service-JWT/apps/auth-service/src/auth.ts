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
