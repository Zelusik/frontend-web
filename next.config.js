/** @type {import('next').NextConfig} */
const nextConfig = {};
const path = require("path");

module.exports = {
  reactStrictMode: false,
  poweredByHeader: false,
  compiler: {
    styledComponents: {
      fileName: true,
      displayName: true,
      pure: true,
    },
    removeConsole: process.env.NODE_ENV === "production",
  },
  plugins: {
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
      },
    },
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
    PROD_URL: process.env.PROD_URL,
    HOTJAR_HJID: process.env.HOTJAR_HJID,
    HOTJAR_HJSV: process.env.HOTJAR_HJSV,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
