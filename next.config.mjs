/** @type {import('next').NextConfig} */

// GitHub Pages yayını için basePath / assetPrefix değeri ortam değişkeninden gelir.
// - Custom domain ya da `kullanici.github.io` kullanıcı reposu  -> NEXT_PUBLIC_BASE_PATH = ""
// - `kullanici.github.io/repo-adi` proje reposu                 -> NEXT_PUBLIC_BASE_PATH = "/repo-adi"
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
