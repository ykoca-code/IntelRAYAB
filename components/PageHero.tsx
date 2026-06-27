import { AnimatedBackground } from './AnimatedBackground';
import { Reveal } from './ui';

/** Alt sayfaların üst başlık bölümü (etiket + başlık + açıklama). */
export function PageHero({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b">
      <AnimatedBackground />
      <div className="container-page py-20 text-center sm:py-24">
        <Reveal>
          <span className="eyebrow mb-5">{label}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
