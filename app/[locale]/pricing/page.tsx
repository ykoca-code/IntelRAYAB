import type { Metadata } from 'next';
import { Check, ArrowRight, Building2 } from 'lucide-react';
import { getDictionary, isLocale, localizedPath, type Locale } from '@/lib/i18n';
import { PageHero } from '@/components/PageHero';
import { Button, Reveal, Stagger, StaggerItem } from '@/components/ui';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : 'tr');
  return { title: dict.meta.pricing.title, description: dict.meta.pricing.description };
}

export default function PricingPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'tr') as Locale;
  const dict = getDictionary(locale);
  const p = dict.pricing;

  return (
    <>
      <PageHero label={p.hero.label} title={p.hero.title} subtitle={p.hero.subtitle} />

      <section className="section-pad">
        <div className="container-page">
          {/* Planlar */}
          <Stagger className="grid gap-6 lg:grid-cols-3">
            {p.plans.map((plan) => (
              <StaggerItem key={plan.id}>
                <div
                  className={`glass-card relative flex h-full flex-col p-7 ${
                    plan.featured ? 'border-primary-to/50 shadow-glow lg:-mt-3 lg:mb-3' : ''
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-gradient px-3.5 py-1 text-[11px] font-bold text-white">
                      {p.mostPopular}
                    </span>
                  )}
                  <h3 className="font-display text-lg font-semibold text-text">{plan.name}</h3>
                  <p className="mt-1.5 min-h-[40px] text-sm text-text-muted">{plan.tagline}</p>

                  <div className="mt-5 flex items-end gap-1.5">
                    <span className="font-display text-4xl font-bold text-text">{plan.price}</span>
                    <span className="mb-1 text-sm text-text-muted">{p.perMonth}</span>
                  </div>

                  <Button
                    href={localizedPath(locale, 'contact')}
                    variant={plan.featured ? 'primary' : 'secondary'}
                    className="mt-6 w-full !py-3"
                  >
                    {plan.cta}
                    <ArrowRight size={15} />
                  </Button>

                  <div className="mt-6 border-t pt-5">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                      {p.featuresLabel}
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-text">
                          <Check size={16} className="mt-0.5 shrink-0 text-primary-to" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <p className="mt-6 text-center text-xs text-text-muted">{p.billingNote}</p>

          {/* Enterprise */}
          <Reveal>
            <div className="mt-10 grid items-center gap-8 rounded-3xl border bg-surface/50 p-8 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient text-ink">
                  <Building2 size={22} />
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-text">{p.enterprise.name}</h3>
                <p className="mt-2 max-w-md text-text-muted">{p.enterprise.tagline}</p>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {p.enterprise.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-text">
                      <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center lg:text-right">
                <div className="font-display text-3xl font-bold text-gold-gradient">
                  {p.enterprise.price}
                </div>
                <div className="mt-5 flex justify-center lg:justify-end">
                  <Button href={localizedPath(locale, 'contact')} variant="primary" className="!px-7 !py-3.5">
                    {p.enterprise.cta}
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* SSS */}
          <div className="mx-auto mt-20 max-w-3xl">
            <Reveal>
              <h2 className="text-center font-display text-2xl font-bold text-text">{p.faqTitle}</h2>
            </Reveal>
            <div className="mt-8 space-y-4">
              {p.faq.map((item) => (
                <Reveal key={item.q}>
                  <div className="glass-card p-6">
                    <h3 className="font-display text-base font-semibold text-text">{item.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
