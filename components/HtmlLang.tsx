'use client';

import { useEffect } from 'react';
import type { Locale } from '@/lib/i18n';

/** İstemci tarafında <html lang> değerini aktif locale'e ayarlar. */
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
