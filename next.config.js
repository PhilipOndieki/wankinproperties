/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    deviceSizes: [360, 480, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 64, 128, 256],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
