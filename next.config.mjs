/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow large static site generation
  staticPageGenerationTimeout: 300,
  // Compress pages
  compress: true,
  // Power headers
  poweredByHeader: false,
  // Images config
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
