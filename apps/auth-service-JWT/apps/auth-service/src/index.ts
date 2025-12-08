import { Elysia, Context, t } from "elysia";
import { auth } from "./auth";
import { cors } from '@elysiajs/cors';
import { prisma } from "./prisma";
import { env } from "./env";

const betterAuthView = (context: Context) => {
    const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"]
    // validate request method
    if(BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
        return auth.handler(context.request);
    } else {
        context.set.status = 405;
        return "Error";
    }
}


const app = new Elysia()
  .use(cors())
  .all('/api/auth/*', betterAuthView)
  .delete('/users/:id', async ({params}) => {
    console.log('Deleting user ' + params.id )
    return await prisma.user.delete({ where: { id: params.id }})
  }, {
    params: t.Object({
      id: t.String(),
    })
  })
  .get("/", () => "Hello Elysia").listen(env.AUTH_SERVICE_PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
