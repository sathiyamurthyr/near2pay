/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["node:sqlite"],
  },
};

export default nextConfig;
