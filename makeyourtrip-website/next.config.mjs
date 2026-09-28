/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Static HTML export for Hostinger shared hosting
  trailingSlash: true,        // Ensures /about/ folder structure for clean URLs
  images: {
    unoptimized: true,        // Required for static export (no Next.js image server)
  },
  // Clean production build
  reactStrictMode: true,
}

export default nextConfig
