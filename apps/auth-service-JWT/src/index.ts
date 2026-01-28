import { Elysia, Context, t } from "elysia";
import { auth, jwtPlugin } from "./auth";
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { cors } from '@elysiajs/cors';
import { prisma } from "./prisma";
import { env } from "./env";

const betterAuthView = (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"]
  // validate request method
  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
  } else {
    context.set.status = 405;
    return "Error";
  }
}


const app = new Elysia()
  // affiche dans la console pour dire quel requète est appelée
  .onRequest(({ request }) => {
    console.log(`[AUTH-SERVICE] ${request.method} ${request.url}`);
  })
  .use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true,
  }))
  .options("/api/auth/verify", ({ set }) => {
    set.status = 204; // No Content
    return "";
  })
  .post("/api/auth/verify", async ({ body, set }) => {
    try {
      const { token } = body;
      if (!token) {
        set.status = 400;
        return { status: "ERROR", message: "Missing token" };
      }

      const jwksUrl = new URL(`/api/auth/jwks`, `http://localhost:${env.AUTH_SERVICE_PORT}`);
      const JWKS = createRemoteJWKSet(jwksUrl);

      const { payload } = await jwtVerify(token, JWKS);

      return {
        status: "SUCCESS",
        decoded: payload,
      };
    } catch (err: any) {
      set.status = 401;

      if (err.message?.includes("expired")) {
        return {
          status: "ERROR",
          code: "TOKEN_EXPIRED",
          message: "Token expired",
        };
      }

      return {
        status: "ERROR",
        code: "INVALID_TOKEN",
        message: err.message,
      };
    }
  }, {
    body: t.Object({
      token: t.String(),
    })
  })
  .all('/api/auth/*', betterAuthView)
  .delete('/users/:id', async ({ params }) => {
    console.log('Deleting user ' + params.id)
    return await prisma.user.delete({ where: { id: params.id } })
  }, {
    params: t.Object({
      id: t.String(),
    })
  })
  .get("/", () => "Hello Elysia").listen(env.AUTH_SERVICE_PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
