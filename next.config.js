/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // Add any external domains if needed
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  swcMinify: true,
}

module.exports = nextConfig 