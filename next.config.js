/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "api"
      },
      {
        protocol: "https",
        hostname: "**",
      }
    ]
  }
};

module.exports = nextConfig;
