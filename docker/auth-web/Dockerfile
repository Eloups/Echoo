FROM node:alpine3.23

COPY ./apps/web-service-authentification/ /app
COPY ./apps/web-service-authentification/.env.docker /app/.env

WORKDIR /app

RUN npm install

ENTRYPOINT [ "npm", "run", "dev" ]