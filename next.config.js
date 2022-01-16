/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  poweredByHeader: false,
  swcMinify: true,
  experimental: {
    // ssr and displayName are configured by default
    styledComponents: true,
    optimizeImages: true,
  },
}

module.exports = nextConfig
