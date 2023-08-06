/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.clerk.dev', // replace with your own domain
        hostname: "lh3.googleusercontent.com",
        hostname: "iousdzhrffzxndhipgfx.supabase.co",
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['images.clerk.dev', 'lh3.googleusercontent.com', 'iousdzhrffzxndhipgfx.supabase.co'],
  },
}

module.exports = nextConfig
