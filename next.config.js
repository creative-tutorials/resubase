/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.clerk.dev", // replace with your own domain
        hostname: "iousdzhrffzxndhipgfx.supabase.co",
        hostname: "img.clerk.com",
        hostname: "cdn.dribbble.com",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      "images.clerk.dev",
      "iousdzhrffzxndhipgfx.supabase.co",
      "img.clerk.com",
      "cdn.dribbble.com",
      "res.cloudinary.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/personal/search",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
