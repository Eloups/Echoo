import type { NextConfig } from "next";
import { config } from "@dotenvx/dotenvx";
import { join } from "path";

config({
  path: join(import.meta.dirname, '..', '..', '.env')
});


const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    API_URL: process.env.API_URL,
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL
  }
};

export default nextConfig;
