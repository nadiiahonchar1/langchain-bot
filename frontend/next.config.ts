import type { NextConfig } from "next";
const SUPPORTED_LANGUAGES = ["uk", "en", "es", "fr", "de"];

const nextConfig: NextConfig = {
  i18n: {
    locales: SUPPORTED_LANGUAGES,
    defaultLocale: "uk",
  },
};

export default nextConfig;
