import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    // serverComponentsExternalPackages: ["pdf-parse"],
    serverExternalPackages: ["pdf-parse"],
  },
};

export default nextConfig;
