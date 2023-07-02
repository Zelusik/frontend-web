/** @type {import('next').NextConfig} */
const nextConfig = {};
const path = require("path");

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    styledComponents: {
      fileName: true,
      displayName: true,
      pure: true,
    },
    removeConsole: process.env.NODE_ENV === "production",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
