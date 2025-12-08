# Demo BetterAuth JWT + non TypeScript Backend

This repo acts as a demonstration of how we can use BetterAuth as a auth micro service to emit JWT that can be used to make authenticated requests against another API that can't use BetterAuth. Here we're using a PHP API to decode signed JWT.

## How to run the repo 
Requirements :
- bun v1.3+
- docker


1. Create `.env` using the `.env.example`
2. Run the following commands
    ```sh
    bun install
    (cd apps/auth-service && bunx prisma generate && bunx prisma migrate deploy)
    bun run dev
    ```
3. Go to [`http://localhost:3000`](http://localhost:3333)

## Repository structure
The repository is composed of 3 different apps :
- `/apps/api` contains the PHP API that will decode JWT emitted by BetterAuth to ensure a request is authenticated.
- `/apps/auth-service` is our minimalistic auth service base on BetterAuth + Elysia + Prisma ORM
- `/apps/web` is a Nextjs client app but it could have been a mobile app or whatever.
- `/api-collection` contains basic HTTP requests collection used to test and develop this proof of concept. Use [Yaak](https://yaak.app) to use it.

You can access the BetterAuth API URL by going to [`http://localhost:3333/api/auth/reference`](http://localhost:3333/api/auth/reference)

## How does it works 

1. The user fills-out a registration form that creates its account onto the app.
2. Once the user is logged-in, the client can make a request to get a JWT token from the `auth-service`. In order to do that, client must hit the `GET /api/auth/token`
3. The client can then make authenticated request to the PHP `api` sending the token into the request (here I pass it through the `token` header).
4. When the PHP `api` receives a request, it can decode and verify the JWT signature to ensure the payload and the emitter of the token is `auth-service`. In order to do that, the PHP `api` must get the JWKS from the `auth-service` by hitting the `GET /api/auth/jwks` endpoint.
5. If the token payload is altered, the signature is invalid or the token has expired, then the PHP `api` will throw an error during the JWT verification.

That way, the PHP `api` is able to authenticate a user without the need to contact `auth-service` at every request. Only a HTTP call is necessary to obtain the JWKS from time to time if you [use a PSR Cache to memoize the JWKS accross requests](https://github.com/firebase/php-jwt?tab=readme-ov-file#using-cached-key-sets).


# Sources
https://youtu.be/dNY4FKXwTsM?si=9VR8QGmr2nqROCm9