import type { Metadata } from 'next';
import { MapPin, Check } from 'lucide-react';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { PageHero } from '@/components/PageHero';
import { Reveal, Stagger, StaggerItem, SectionHeading } from '@/components/ui';
import { CTASection } from '@/components/blocks';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : 'tr');
  return { title: dict.meta.about.title, description: dict.meta.about.description };
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'tr') as Locale;
  const dict = getDictionary(locale);
  const a = dict.about;

  return (
    <>
      <PageHero label={a.hero.label} title={a.hero.title} subtitle={a.hero.subtitle} />

      {/* Hikaye + Misyon */}
      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card h-full p-8">
              <h2 className="font-display text-2xl font-bold text-text">{a.story.title}</h2>
              <p className="mt-4 leading-relaxed text-text-muted">{a.story.body}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="glass-card h-full p-8">
              <h2 className="font-display text-2xl font-bold text-text">{a.mission.title}</h2>
              <p className="mt-4 leading-relaxed text-text-muted">{a.mission.body}</p>
              <div className="mt-6 flex items-center gap-2.5 rounded-xl border bg-white/[0.03] px-4 py-3 text-sm">
                <MapPin size={16} className="text-primary-to" />
                <span className="text-text-muted">{a.location.body}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Yaklaşım */}
      <section className="section-pad border-t bg-surface/20">
        <div className="container-page">
          <SectionHeading title={a.approach.title} />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {a.approach.items.map((item, i) => (
              <StaggerItem key={item.title}>
                <div className="glass-card glass-card-hover h-full p-6">
                  <span className="font-display text-3xl font-bold text-gradient">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Neden biz + Değerler */}
      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-bold text-text">{a.why.title}</h2>
              <ul className="mt-6 space-y-4">
                {a.why.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 shrink-0 text-primary-to" />
                    <span className="text-text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <h2 className="font-display text-2xl font-bold text-text">{a.values.title}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {a.values.items.map((item) => (
                  <div key={item.title} className="glass-card p-5">
                    <h3 className="font-display text-base font-semibold text-text">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
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
