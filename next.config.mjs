// next.config.mjs
// Source: https://nextjs.org/docs/app/guides/static-exports
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // basePath/assetPrefix are injected by actions/configure-pages@v5 in CI
}
export default nextConfig
