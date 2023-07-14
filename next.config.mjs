/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["uploadthing.com", "lh3.googleusercontent.com", "i.giphy.com"],
  },
}

export default nextConfig
