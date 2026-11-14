/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true, // required for static export — Next's Image Optimization API needs a server
    remotePatterns: [],
  },
};

export default nextConfig;