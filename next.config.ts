import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

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

const withNextIntl = createNextIntlPlugin();

//export default nextConfig;
export default withNextIntl(nextConfig);


