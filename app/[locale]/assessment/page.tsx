import type { Metadata } from 'next';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { PageHero } from '@/components/PageHero';
import { ReadinessAssessment } from '@/components/ReadinessAssessment';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : 'tr');
  return { title: dict.meta.assessment.title, description: dict.meta.assessment.description };
}

export default function AssessmentPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'tr') as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        label={dict.assessment.hero.label}
        title={dict.assessment.hero.title}
        subtitle={dict.assessment.hero.subtitle}
      />
      <section className="section-pad">
        <div className="container-page">
          <ReadinessAssessment locale={locale} dict={dict} />
        </div>
      </section>
    </>
  );
}
