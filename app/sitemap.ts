import type { MetadataRoute } from 'next';
import { locales, routes } from '@/lib/i18n';

// Yayın adresi. Custom domain'e geçerseniz burayı güncelleyin.
const SITE = 'https://ykoca-code.github.io/IntelRAYAB';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const key of Object.keys(routes) as (keyof typeof routes)[]) {
      const segment = routes[key];
      const path = segment ? `/${locale}/${segment}` : `/${locale}`;
      entries.push({
        url: `${SITE}${path}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: key === 'home' ? 1 : 0.7,
      });
    }
  }
  return entries;
}
