/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      child_process: false,
      'spawn-sync': false,
    };
    return config;
  },
};

module.exports = nextConfig; 