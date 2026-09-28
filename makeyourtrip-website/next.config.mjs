/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Static HTML export for Hostinger shared hosting
  trailingSlash: true,        // Ensures /about/ folder structure for clean URLs
  images: {
    unoptimized: true,        // Required for static export (no Next.js image server)
  },
  // Clean production build
  reactStrictMode: true,
  devIndicators: {
    appIsrStatus: false, // Disables the 'N' App Router indicator
    buildActivity: false, // Disables the build activity triangle
  },
}

export default nextConfig
