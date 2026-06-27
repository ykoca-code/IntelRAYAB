import type { Metadata } from 'next';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { PageHero } from '@/components/PageHero';
import { Stagger, StaggerItem } from '@/components/ui';
import { SectorCard } from '@/components/cards';
import { CTASection } from '@/components/blocks';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : 'tr');
  return { title: dict.meta.sectors.title, description: dict.meta.sectors.description };
}

export default function SectorsPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'tr') as Locale;
  const dict = getDictionary(locale);
  const s = dict.sectors;

  return (
    <>
      <PageHero label={s.hero.label} title={s.hero.title} subtitle={s.hero.subtitle} />

      <section className="section-pad">
        <div className="container-page">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.list.map((sector) => (
              <StaggerItem key={sector.name}>
                <SectorCard icon={sector.icon} name={sector.name} useCase={sector.useCase} />
              </StaggerItem>
            ))}
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
