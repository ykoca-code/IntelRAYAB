'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { locales, type Locale } from '@/lib/i18n';

/**
 * Aynı sayfanın diğer dildeki sürümüne gider (path'in ilk segmentini değiştirir).
 * Seçim localStorage'da saklanır; root yönlendirici bunu okur.
 */
export function LangSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() || `/${current}`;

  function pathForLocale(target: Locale): string {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${target}`;
    segments[0] = target;
    return `/${segments.join('/')}`;
  }

  return (
    <div
      className="inline-flex items-center rounded-lg border p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Language"
    >
      {locales.map((loc) => {
        const active = loc === current;
        return (
          <Link
            key={loc}
            href={pathForLocale(loc)}
            onClick={() => {
              try {
                window.localStorage.setItem('preferred-locale', loc);
              } catch {
                /* yok say */
              }
            }}
            aria-current={active ? 'true' : undefined}
            className={`rounded-md px-2.5 py-1 uppercase transition-colors ${
              active ? 'bg-primary-gradient text-white' : 'text-text-muted hover:text-text'
            }`}
          >
            {loc}
          </Link>
        );
      })}
    </div>
  );
}
