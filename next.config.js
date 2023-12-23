/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "sublinks"
      },
      {
        protocol: "https",
        hostname: "**",
      }
    ]
  }
};

module.exports = nextConfig;
