/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  outputFileTracingRoot: new URL('.', import.meta.url).pathname,
}

export default nextConfig
