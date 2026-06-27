import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getDictionary, isLocale, localizedPath, type Locale } from '@/lib/i18n';
import { PageHero } from '@/components/PageHero';
import { Button, Reveal } from '@/components/ui';
import { IntegrationGrid } from '@/components/IntegrationGrid';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : 'tr');
  return { title: dict.meta.integrations.title, description: dict.meta.integrations.description };
}

export default function IntegrationsPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'tr') as Locale;
  const dict = getDictionary(locale);
  const i = dict.integrations;

  return (
    <>
      <PageHero label={i.hero.label} title={i.hero.title} subtitle={i.hero.subtitle} />

      <section className="section-pad">
        <div className="container-page">
          <IntegrationGrid dict={dict} />

          <Reveal>
            <div className="mt-16 rounded-2xl border bg-surface/40 px-6 py-10 text-center">
              <p className="mx-auto max-w-2xl text-lg text-text">{i.closing.text}</p>
              <div className="mt-6 flex justify-center">
                <Button href={localizedPath(locale, 'contact')} variant="primary">
                  {i.closing.cta} <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
