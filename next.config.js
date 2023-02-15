/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "via.placeholder.com"],
  },
  swcMinify: true,
};

module.exports = nextConfig;
