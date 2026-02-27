FROM oven/bun:1.3.10-alpine

COPY ./apps/auth-service-JWT /api
COPY ./apps/auth-service-JWT/.env.docker /api/.env

WORKDIR /api

RUN bun install
RUN bunx prisma generate

ENTRYPOINT [ "bun", "run", "dev" ] 