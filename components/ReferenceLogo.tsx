'use client';

import { useState } from 'react';
import { asset } from '@/lib/i18n';

/**
 * Müşteri/referans logosu, kademeli fallback ile:
 *   1) public/logos/<logo>.png  (kullanıcı buraya gerçek dosyayı bırakabilir)
 *   2) Clearbit Logo API (resmi alan adından)
 *   3) Zarif monokrom kelime-işareti placeholder
 *
 * Not: Yerel dosya yoksa (1) sessizce (2)'ye düşer. Gerçek logoları eklemek için
 * README'deki "public/logos" bölümüne bakın.
 */
export function ReferenceLogo({
  name,
  domain,
  logo,
  className = '',
}: {
  name: string;
  domain: string;
  logo: string;
  className?: string;
}) {
  const sources = [
    asset(`/logos/${logo}.png`),
    `https://logo.clearbit.com/${domain}`,
  ];
  const [idx, setIdx] = useState(0);
  const failed = idx >= sources.length;

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg px-4 py-2 ${className}`}
        aria-label={name}
      >
        <span className="font-display text-lg font-bold tracking-tight text-text">{name}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sources[idx]}
      alt={`${name} logo`}
      loading="lazy"
      className={`max-h-12 w-auto object-contain ${className}`}
      onError={() => setIdx((i) => i + 1)}
    />
  );
}
