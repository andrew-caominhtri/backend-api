import type { NextConfig } from "next";
import { apiUrl } from "./lib/api-url";

const url = new URL(apiUrl);
const protocol = url.protocol === "https:" ? "https" : "http";
const apiHostIsLoopback =
  url.hostname === "localhost" ||
  url.hostname === "127.0.0.1" ||
  url.hostname === "::1";

const nextConfig: NextConfig = {
  images: {
    // Default image optimizer blocks private IPs; allow when the API URL is loopback.
    dangerouslyAllowLocalIP: apiHostIsLoopback,
    remotePatterns: [
      {
        protocol,
        hostname: url.hostname,
        ...(url.port ? { port: url.port } : {}),
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;