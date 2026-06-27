'use client';

/**
 * Performans-dostu animasyonlu arkaplan: CSS ile hareket eden aurora/gradient mesh.
 * JS animasyonu yok; `prefers-reduced-motion` aktifse CSS animasyonları durur (globals.css).
 */
export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Izgara dokusu */}
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Aurora lekeleri */}
      <div
        className="absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full opacity-30 blur-[120px] animate-aurora"
        style={{ background: 'radial-gradient(circle, #2563eb, transparent 65%)' }}
      />
      <div
        className="absolute -right-24 top-10 h-[30rem] w-[30rem] rounded-full opacity-25 blur-[120px] animate-aurora"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 65%)', animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-[-12rem] left-1/3 h-[26rem] w-[26rem] rounded-full opacity-15 blur-[120px] animate-aurora"
        style={{ background: 'radial-gradient(circle, #c8a55b, transparent 70%)', animationDelay: '-11s' }}
      />

      {/* Alt geçiş gölgesi */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
