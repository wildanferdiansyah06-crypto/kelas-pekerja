/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "images.unsplash.com",
    }],
  },
  
  // Tambahin ini buat support file upload besar
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
  
  // Experimental config buat App Router (Next.js 13+)
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb'
    }
  },
};

module.exports = nextConfig;
