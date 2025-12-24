import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/avatars/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '9000',
        pathname: '/avatars/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.SERVER_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
