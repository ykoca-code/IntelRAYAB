import type { Metadata } from 'next';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { PageHero } from '@/components/PageHero';
import { Stagger, StaggerItem } from '@/components/ui';
import { AdvisorCard } from '@/components/cards';
import { CTASection } from '@/components/blocks';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : 'tr');
  return { title: dict.meta.advisors.title, description: dict.meta.advisors.description };
}

export default function AdvisorsPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'tr') as Locale;
  const dict = getDictionary(locale);
  const a = dict.advisors;

  return (
    <>
      <PageHero label={a.hero.label} title={a.hero.title} subtitle={a.hero.subtitle} />

      <section className="section-pad">
        <div className="container-page">
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {a.list.map((adv) => (
              <StaggerItem key={adv.title}>
                <AdvisorCard
                  icon={adv.icon}
                  title={adv.title}
                  desc={adv.desc}
                  tasks={adv.tasks}
                  tasksLabel={dict.common.whatTheyDo}
                  featured={adv.featured}
                  featuredLabel={a.mostWanted}
                />
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
