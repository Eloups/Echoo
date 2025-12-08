import { config } from '@dotenvx/dotenvx';
import { join } from 'path';

config({
  path: join(import.meta.dirname, '..', '..', '..', '.env')
});

type Env = {
  DB_URL: string,
  BETTER_AUTH_SECRET: string,
  AUTH_SERVICE_PORT: string,
}

export const env = process.env as Env;