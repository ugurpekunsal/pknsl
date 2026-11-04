/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: [], // Add any external domains if needed
    unoptimized: process.env.NODE_ENV !== 'production',
  },
}

module.exports = nextConfig 