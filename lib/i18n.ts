import tr from '@/locales/tr.json';
import en from '@/locales/en.json';

export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'tr';

// Dictionary tipi TR sözlüğünden türetilir; EN aynı şekli paylaşır.
export type Dictionary = typeof tr;

const dictionaries: Record<Locale, Dictionary> = {
  tr,
  en: en as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Route slug'ları her iki dilde ortaktır; etiketler sözlükten gelir.
export const routes = {
  home: '',
  services: 'services',
  advisors: 'advisors',
  sectors: 'sectors',
  integrations: 'integrations',
  references: 'references',
  about: 'about',
  contact: 'contact',
  privacy: 'privacy',
} as const;

export type RouteKey = keyof typeof routes;

// basePath'i ortam değişkeninden okur (GitHub Pages alt-dizin senaryosu için).
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Bir asset'in (public/ içindeki) basePath ile öneklenmiş yolunu döndürür.
export function asset(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${clean}`;
}

// Locale + route key'den göreli (basePath next tarafından eklenir) link üretir.
export function localizedPath(locale: Locale, key: RouteKey): string {
  const segment = routes[key];
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}
