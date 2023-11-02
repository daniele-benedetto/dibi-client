const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['res.cloudinary.com', '149.62.186.51'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(new NodePolyfillPlugin());
    }

    return config;
  },
};

module.exports = nextConfig;
