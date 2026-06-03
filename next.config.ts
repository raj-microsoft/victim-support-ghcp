import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/victim-support-ghcp",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
