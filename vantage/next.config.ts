import type { NextConfig } from "next";

// @ts-ignore
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  turbopack: {},
};

export default ghfghfgfwithPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
