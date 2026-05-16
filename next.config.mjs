/**
 * Two build modes:
 *   - default (server)         → full Next.js, API routes work, deploys to Vercel
 *   - DEMO_STATIC=true         → static export with /tbh_tampa basePath, deploys to GitHub Pages
 */
const isStaticDemo = process.env.DEMO_STATIC === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: isStaticDemo,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  ...(isStaticDemo && {
    output: "export",
    basePath: "/tbh_tampa",
    assetPrefix: "/tbh_tampa",
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
  }),
  ...(!isStaticDemo && {
    experimental: {
      serverActions: { bodySizeLimit: "10mb" },
    },
  }),
  env: {
    NEXT_PUBLIC_DEMO_STATIC: isStaticDemo ? "true" : "false",
  },
};

export default nextConfig;
