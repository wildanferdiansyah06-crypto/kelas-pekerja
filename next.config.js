/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },


  // Experimental config buat App Router (Next.js 13+)
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb'
    }
  },
};

module.exports = nextConfig;
