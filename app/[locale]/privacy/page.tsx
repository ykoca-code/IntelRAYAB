import type { Metadata } from 'next';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/ui';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : 'tr');
  return { title: dict.meta.privacy.title, description: dict.meta.privacy.description };
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'tr') as Locale;
  const dict = getDictionary(locale);
  const p = dict.privacy;

  return (
    <>
      <PageHero label={dict.footer.legalTitle} title={p.title} />

      <section className="section-pad">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="rounded-xl border border-gold/30 bg-gold/5 px-5 py-4 text-sm text-text-muted">
              {p.intro}
            </p>
          </Reveal>

          <div className="mt-10 space-y-8">
            {p.sections.map((section) => (
              <Reveal key={section.title}>
                <div>
                  <h2 className="font-display text-xl font-semibold text-text">{section.title}</h2>
                  <p className="mt-2 leading-relaxed text-text-muted">{section.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
