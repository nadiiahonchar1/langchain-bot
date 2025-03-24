import createNextIntlPlugin from "next-intl/plugin";
// import type { NextConfig } from "next";
// const SUPPORTED_LANGUAGES = ["uk", "en", "es", "fr", "de"];

const withNextIntl = createNextIntlPlugin()

// const nextConfig: NextConfig = {
  // i18n: {
  //   locales: SUPPORTED_LANGUAGES,
  //   defaultLocale: "uk",
  // },
// };

// export default withNextIntl(nextConfig);

export default withNextIntl({
  reactStrictMode: true,
});
