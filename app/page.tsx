'use client';

import { useEffect } from 'react';
import { basePath } from '@/lib/i18n';

/**
 * Kök yönlendirici: tercih edilen dile (localStorage > tarayıcı > tr) götürür.
 * Statik export uyumlu — istemci tarafında çalışır, <noscript> yedeği vardır.
 */
export default function RootRedirect() {
  useEffect(() => {
    let target = 'tr';
    try {
      const saved = window.localStorage.getItem('preferred-locale');
      if (saved === 'tr' || saved === 'en') target = saved;
      else if (navigator.language?.toLowerCase().startsWith('en')) target = 'en';
    } catch {
      /* yok say */
    }
    window.location.replace(`${basePath}/${target}/`);
  }, []);

  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/tr/`} />
      </noscript>
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-text-muted">IntelRAYAB · yönlendiriliyor…</span>
      </div>
    </>
  );
}
