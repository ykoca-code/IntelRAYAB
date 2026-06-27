import { ArrowRight } from 'lucide-react';
import { Button, Reveal, Stagger, StaggerItem } from './ui';
import { localizedPath, type Dictionary, type Locale } from '@/lib/i18n';

/** Sayfa sonu CTA bandı. */
export function CTASection({
  locale,
  title,
  subtitle,
  cta,
}: {
  locale: Locale;
  title: string;
  subtitle: string;
  cta: string;
}) {
  return (
    <section className="section-pad">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-40"
              aria-hidden="true"
              style={{
                background:
                  'radial-gradient(60% 120% at 50% 0%, rgba(37,99,235,0.35), transparent 70%)',
              }}
            />
            <h2 className="mx-auto max-w-3xl font-display text-2xl font-bold leading-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-text-muted sm:text-lg">{subtitle}</p>
            <div className="mt-8 flex justify-center">
              <Button href={localizedPath(locale, 'contact')} variant="primary" className="!px-7 !py-3.5">
                {cta}
                <ArrowRight size={17} />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Nitel güven göstergeleri (sayısal uydurma yok — değerler düzenlenebilir, locales/*.json). */
export function TrustIndicators({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y bg-surface/30 py-12">
      <div className="container-page">
        <Stagger className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {dict.home.trustIndicators.items.map((item) => (
            <StaggerItem key={item.label} className="text-center">
              <div className="font-display text-xl font-bold text-gradient sm:text-2xl">
                {item.value}
              </div>
              <div className="mt-1.5 text-xs text-text-muted sm:text-sm">{item.label}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
