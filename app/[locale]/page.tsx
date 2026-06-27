import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getDictionary, isLocale, localizedPath, type Locale } from '@/lib/i18n';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Button, Reveal, SectionHeading, Stagger, StaggerItem } from '@/components/ui';
import { ServiceCard, AdvisorCard, SectorCard } from '@/components/cards';
import { CTASection, TrustIndicators } from '@/components/blocks';
import { ReferenceLogo } from '@/components/ReferenceLogo';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : 'tr');
  return { title: dict.meta.home.title, description: dict.meta.home.description };
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'tr') as Locale;
  const dict = getDictionary(locale);
  const h = dict.home;

  return (
    <>
      {/* ---------------------------------- Hero --------------------------------- */}
      <section className="relative overflow-hidden">
        <AnimatedBackground />
        <div className="container-page flex flex-col items-center pb-20 pt-20 text-center sm:pb-28 sm:pt-28">
          <Reveal>
            <span className="eyebrow mb-6">
              <Sparkles size={13} className="text-primary-to" />
              {h.hero.badge}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {h.hero.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
              {h.hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Button href={localizedPath(locale, 'assessment')} variant="primary" className="!px-7 !py-3.5">
                {h.hero.primaryCta}
                <ArrowRight size={17} />
              </Button>
              <Button href={localizedPath(locale, 'services')} variant="secondary" className="!px-7 !py-3.5">
                {h.hero.secondaryCta}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------- Trust band ------------------------------ */}
      <section className="border-y bg-surface/30 py-10">
        <div className="container-page">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-text-muted">
            {h.trustBand.title}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-80">
            {dict.references.list.map((ref) => (
              <ReferenceLogo
                key={ref.name}
                name={ref.name}
                domain={ref.domain}
                logo={ref.logo}
                className="grayscale transition hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- What we do ------------------------------ */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow={h.whatWeDo.label}
            title={h.whatWeDo.title}
            subtitle={h.whatWeDo.subtitle}
          />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dict.services.list.map((s) => (
              <StaggerItem key={s.title}>
                <ServiceCard
                  icon={s.icon}
                  title={s.title}
                  desc={s.desc}
                  outcomes={s.outcomes}
                  outcomesLabel={dict.common.outcomes}
                />
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10 text-center">
            <Button href={localizedPath(locale, 'services')} variant="ghost">
              {dict.cta.allServices} <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------- Advisors (flagship) -------------------------- */}
      <section className="section-pad border-t bg-surface/20">
        <div className="container-page">
          <SectionHeading
            eyebrow={h.advisorsTeaser.label}
            title={h.advisorsTeaser.title}
            subtitle={h.advisorsTeaser.subtitle}
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.advisors.list.slice(0, 4).map((a) => (
              <StaggerItem key={a.title}>
                <AdvisorCard
                  icon={a.icon}
                  title={a.title}
                  desc={a.desc}
                  tasks={a.tasks.slice(0, 3)}
                  tasksLabel={dict.common.whatTheyDo}
                  featured={a.featured}
                  featuredLabel={h.advisorsTeaser.featuredBadge}
                />
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10 text-center">
            <Button href={localizedPath(locale, 'advisors')} variant="primary">
              {h.advisorsTeaser.cta} <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>

      {/* ------------------------------ Why IntelRAYAB --------------------------- */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow={h.why.label} title={h.why.title} />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {h.why.items.map((item, i) => (
              <StaggerItem key={item.title}>
                <div className="glass-card glass-card-hover h-full p-6">
                  <span className="font-display text-3xl font-bold text-gradient">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ------------------------------ Trust indicators ------------------------- */}
      <TrustIndicators dict={dict} />

      {/* -------------------------------- Sectors -------------------------------- */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow={h.sectorsStrip.label} title={h.sectorsStrip.title} />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dict.sectors.list.slice(0, 6).map((s) => (
              <StaggerItem key={s.name}>
                <SectorCard icon={s.icon} name={s.name} useCase={s.useCase} />
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10 text-center">
            <Button href={localizedPath(locale, 'sectors')} variant="ghost">
              {h.sectorsStrip.cta} <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>

      {/* ----------------------------- Integrations ------------------------------ */}
      <section className="section-pad border-t bg-surface/20">
        <div className="container-page">
          <SectionHeading
            eyebrow={h.integrationsStrip.label}
            title={h.integrationsStrip.title}
            subtitle={h.integrationsStrip.subtitle}
          />
          <Reveal>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {dict.integrations.categories.flatMap((c) => c.items).slice(0, 14).map((item) => (
                <span
                  key={item.name}
                  className="glass-card px-4 py-2 text-sm font-medium text-text-muted"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </Reveal>
          <div className="mt-10 text-center">
            <Button href={localizedPath(locale, 'integrations')} variant="ghost">
              {h.integrationsStrip.cta} <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>

      {/* ------------------------------- References ------------------------------ */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow={dict.references.hero.label}
            title={dict.references.hero.title}
            subtitle={dict.references.hero.subtitle}
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-3">
            {dict.references.list.map((ref) => (
              <StaggerItem key={ref.name}>
                <div className="glass-card glass-card-hover flex h-full flex-col items-center p-8 text-center">
                  <div className="flex h-16 items-center">
                    <ReferenceLogo name={ref.name} domain={ref.domain} logo={ref.logo} />
                  </div>
                  <p className="mt-4 text-sm text-text-muted">{ref.blurb}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10 text-center">
            <Button href={localizedPath(locale, 'references')} variant="ghost">
              {dict.nav.references} <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------- Closing CTA ---------------------------- */}
      <CTASection
        locale={locale}
        title={h.closingCta.title}
        subtitle={h.closingCta.subtitle}
        cta={h.closingCta.cta}
      />
    </>
  );
}
