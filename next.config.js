/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL
  },
  images: {
    domains: ['api.lorem.space'],
  },
}

module.exports = nextConfig
