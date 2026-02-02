FROM node:20-alpine

WORKDIR /app

COPY ./apps/auth-service .
COPY ./apps/auth-service/.env.docker ./.env
RUN npm install
EXPOSE 3000
# ENTRYPOINT  ["sh"]
CMD ["node", "index.js"]