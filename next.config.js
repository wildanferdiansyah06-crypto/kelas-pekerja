/** @type {import('next').NextConfig} */
const nextConfig = {
  // HAPUS SEMUA INI:
  // output: "export",
  // distDir: "dist",
  
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "images.unsplash.com",
    }],
  },
};

module.exports = nextConfig;
