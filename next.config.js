/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.clerk.dev', // replace with your own domain
        hostname: "lh3.googleusercontent.com",
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['images.clerk.dev', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
