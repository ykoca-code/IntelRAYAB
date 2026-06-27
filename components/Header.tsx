'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { LangSwitcher } from './LangSwitcher';
import { Button } from './ui';
import { localizedPath, type Dictionary, type Locale, type RouteKey } from '@/lib/i18n';

const navKeys: { key: RouteKey; label: keyof Dictionary['nav'] }[] = [
  { key: 'services', label: 'services' },
  { key: 'advisors', label: 'advisors' },
  { key: 'sectors', label: 'sectors' },
  { key: 'integrations', label: 'integrations' },
  { key: 'references', label: 'references' },
  { key: 'about', label: 'about' },
  { key: 'contact', label: 'contact' },
];

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Rota değişince mobil menüyü kapat
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Menü açıkken arkaplan kaydırmasını engelle
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link href={localizedPath(locale, 'home')} aria-label="IntelRAYAB" className="shrink-0">
          <Logo size={30} />
        </Link>

        {/* Masaüstü menü */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navKeys.map(({ key, label }) => {
            const href = localizedPath(locale, key);
            const active = pathname === href || pathname === `${href}/`;
            return (
              <Link
                key={key}
                href={href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active ? 'text-text' : 'text-text-muted hover:text-text'
                }`}
              >
                {dict.nav[label]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LangSwitcher current={locale} />
          </div>
          <Button
            href={localizedPath(locale, 'contact')}
            variant="primary"
            className="hidden md:inline-flex !px-4 !py-2.5 text-[13px]"
          >
            {dict.cta.assessmentShort}
            <ArrowRight size={15} />
          </Button>

          {/* Hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border p-2 text-text lg:hidden"
            aria-label={open ? dict.common.close : dict.common.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      {open && (
        <div className="border-t bg-ink/95 backdrop-blur-xl lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            {navKeys.map(({ key, label }) => (
              <Link
                key={key}
                href={localizedPath(locale, key)}
                className="rounded-lg px-3 py-3 text-base font-medium text-text-muted hover:bg-white/5 hover:text-text"
              >
                {dict.nav[label]}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between gap-3">
              <LangSwitcher current={locale} />
              <Button
                href={localizedPath(locale, 'contact')}
                variant="primary"
                className="flex-1 !py-3"
              >
                {dict.cta.assessmentShort}
                <ArrowRight size={16} />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
