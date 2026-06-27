import type { Metadata } from 'next';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { PageHero } from '@/components/PageHero';
import { Stagger, StaggerItem } from '@/components/ui';
import { CTASection } from '@/components/blocks';
import { ReferenceLogo } from '@/components/ReferenceLogo';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : 'tr');
  return { title: dict.meta.references.title, description: dict.meta.references.description };
}

export default function ReferencesPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'tr') as Locale;
  const dict = getDictionary(locale);
  const r = dict.references;

  return (
    <>
      <PageHero label={r.hero.label} title={r.hero.title} subtitle={r.hero.subtitle} />

      <section className="section-pad">
        <div className="container-page">
          <Stagger className="grid gap-6 lg:grid-cols-3">
            {r.list.map((ref) => (
              <StaggerItem key={ref.name}>
                <article className="glass-card glass-card-hover flex h-full flex-col p-7">
                  <div className="flex h-14 items-center">
                    <ReferenceLogo name={ref.name} domain={ref.domain} logo={ref.logo} />
                  </div>
                  <p className="mt-4 text-sm text-text-muted">{ref.blurb}</p>

                  <dl className="mt-6 space-y-4 border-t pt-5 text-sm">
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-primary-to">
                        {r.caseLabels.problem}
                      </dt>
                      <dd className="mt-1 text-text-muted">{ref.case.problem}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-primary-to">
                        {r.caseLabels.solution}
                      </dt>
                      <dd className="mt-1 text-text-muted">{ref.case.solution}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-gold">
                        {r.caseLabels.result}
                      </dt>
                      <dd className="mt-1 text-text-muted">{ref.case.result}</dd>
                    </div>
                  </dl>
                </article>
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
