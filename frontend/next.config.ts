import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
  remotePatterns: [
   {
    protocol: "http",
    hostname: "localhost",
    port: "fetch(`${process.env.NEXT_PUBLIC_API_URL}",
    pathname: "/uploads/**",
   },
  ],
 },
};

export default nextConfig;