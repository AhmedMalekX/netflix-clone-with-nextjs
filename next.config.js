/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "i.ytimg.com", "yt3.ggpht.com"],
  },
  env: {
    YOUTUBE_API_KEY: "AIzaSyAvtQceUQMrgbIGBUd60K4NU8jSMpmH_ks",
    NEXT_PUBLIC_MAGIN_PUBLISHABLE_API_KEY: "pk_live_5614236DD8A2A276",
    NEXT_PUBLIC_HASURA_ADMIN_SECRET:
      "bst7d0GfWzHE41OylU2dvYNcN4NZkMNaXCPLpYyujWysmPAs6yI0kRtCL6tRXNzc",
    NEXT_PUBLIC_HASURA_ADMIN_URL:
      "https://settled-roughy-81.hasura.app/v1/graphql",
    MAGIC_ADMIN_API_KEYS: "sk_live_76184C5E6293C2C1",
    JWT_SECRET: "thisissupersecret123456789!@#$%^&*()_",
    DEVELOPMENT: true,
  },
};

module.exports = nextConfig;
