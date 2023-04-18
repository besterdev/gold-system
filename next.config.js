/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL
  },
  images: {
    domains: ['api.lorem.space', 'robohash.org', 'res.cloudinary.com']
  }
}

module.exports = nextConfig
