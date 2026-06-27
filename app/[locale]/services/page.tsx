import type { Metadata } from 'next';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { PageHero } from '@/components/PageHero';
import { Stagger, StaggerItem, SectionHeading } from '@/components/ui';
import { ServiceCard } from '@/components/cards';
import { CTASection } from '@/components/blocks';
import { getIcon } from '@/lib/icons';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : 'tr');
  return { title: dict.meta.services.title, description: dict.meta.services.description };
}

export default function ServicesPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'tr') as Locale;
  const dict = getDictionary(locale);
  const s = dict.services;

  return (
    <>
      <PageHero label={s.hero.label} title={s.hero.title} subtitle={s.hero.subtitle} />

      <section className="section-pad">
        <div className="container-page">
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {s.list.map((item) => (
              <StaggerItem key={item.title}>
                <ServiceCard
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                  outcomes={item.outcomes}
                  outcomesLabel={dict.common.outcomes}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Fonksiyonel çözümler */}
      <section className="section-pad border-t bg-surface/20">
        <div className="container-page">
          <SectionHeading eyebrow={s.functional.label} title={s.functional.title} />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.functional.items.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <StaggerItem key={item.title}>
                  <div className="glass-card glass-card-hover flex h-full items-start gap-4 p-5">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-gradient text-white shadow-glow">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-text">{item.title}</h3>
                      <p className="mt-1 text-sm text-text-muted">{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <CTASection
        locale={locale}
        title={dict.home.closingCta.title}
        subtitle={dict.home.closingCta.subtitle}
        cta={dict.home.closingCta.cta}
      />
    </>
  );
}
