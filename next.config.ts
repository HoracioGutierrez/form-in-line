import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    remotePatterns : [
      {
        hostname: "lh3.googleusercontent.com"
      },
      {
        hostname: "api.dicebear.com"
      }
    ]
  }
};

export default nextConfig;
