/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "https://media.kanjialive.com/",
      "https://media.kanjialive.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
}

export default nextConfig
