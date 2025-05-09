/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'gadget-nova-bucket.s3.ap-southeast-1.amazonaws.com',
        pathname: '**',
        port: ''
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb'
    }
  },
  transpilePackages: ['geist']
};

module.exports = nextConfig;
