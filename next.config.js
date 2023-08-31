/** @type {import('next').NextConfig} */
const nextConfig = {};
const path = require("path");

module.exports = {
  reactStrictMode: false,
  poweredByHeader: false,
  swcMinify: false,
  compiler: {
    styledComponents: {
      fileName: true,
      displayName: true,
      pure: true,
    },
    removeConsole: process.env.NODE_ENV === "production",
  },
  // 환경변수
  env: {
    KAKAO_AUTH_URL: process.env.KAKAO_AUTH_URL,
    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
    KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
    KAKAO_SEARCH_API_KEY: process.env.KAKAO_SEARCH_API_KEY,
    BASE_URL: process.env.BASE_URL,
    APPLE_REDIRECT_URL: process.env.APPLE_REDIRECT_URL,
    APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
