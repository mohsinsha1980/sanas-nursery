/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3012",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3012",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
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
        protocol: "http",
        hostname: "sanasnursery.com/dev",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "sanasnursery.com/dev",
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
        hostname: "www.trendythreads.co.in",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "sanasnursery.com/api",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "sanasnursery.com/api",
        pathname: "**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
