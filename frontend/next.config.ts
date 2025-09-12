import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  turbopack: {
    resolveAlias: {
      underscore: "lodash",
      mocha: { browser: "mocha/browser-entry.js" },
    },
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3333",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3333",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "6900",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "6900",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "sanasnursery.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "sanasnursery.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
