import Link from 'next/link';
import { Logo } from '@/components/Logo';

/**
 * Genel 404 — statik export'ta 404.html olarak üretilir (GitHub Pages bunu sunar).
 * Locale bağımsız; iki dilde kısa mesaj içerir.
 */
export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Logo size={36} />
      <p className="mt-10 font-display text-7xl font-bold text-gradient">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-text">
        Sayfa bulunamadı · Page not found
      </h1>
      <p className="mt-3 max-w-md text-text-muted">
        Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
        <br />
        The page you&apos;re looking for may have moved or never existed.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/tr/"
          className="rounded-xl bg-primary-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
        >
          Anasayfa
        </Link>
        <Link
          href="/en/"
          className="rounded-xl border px-6 py-3 text-sm font-semibold text-text transition hover:border-white/25"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
