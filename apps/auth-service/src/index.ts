import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { auth } from './auth.js'
import { cors } from 'hono/cors';

const app = new Hono()
app.use(
	"/api/auth/*", // or replace with "*" to enable cors for all routes
	cors({
		origin: "http://localhost:3001", // replace with your origin
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

// BETTER AUTH
app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

serve({
  fetch: app.fetch,
  port: 3333
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
