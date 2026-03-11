/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export
  output: "export",
  distDir: "dist",

  // Images (required for static export)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Clean URLs
  trailingSlash: true,

  // TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // Headers for static hosting
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
