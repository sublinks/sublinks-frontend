/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost'],
    }
  },
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
