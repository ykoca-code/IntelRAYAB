import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/ui';
import { ContactForm } from '@/components/ContactForm';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : 'tr');
  return { title: dict.meta.contact.title, description: dict.meta.contact.description };
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'tr') as Locale;
  const dict = getDictionary(locale);
  const c = dict.contact;

  const info = [
    { icon: Mail, label: c.info.emailLabel, value: c.info.email, href: `mailto:${c.info.email}` },
    { icon: Phone, label: c.info.phoneLabel, value: c.info.phone, href: undefined },
    { icon: MapPin, label: c.info.addressLabel, value: c.info.address, href: undefined },
  ];

  return (
    <>
      <PageHero label={c.hero.label} title={c.hero.title} subtitle={c.hero.subtitle} />

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Bilgi sütunu */}
          <Reveal>
            <div>
              <h2 className="font-display text-xl font-bold text-text">{c.info.title}</h2>
              <ul className="mt-6 space-y-4">
                {info.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="glass-card glass-card-hover flex items-start gap-4 p-5">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-gradient text-white shadow-glow">
                        <Icon size={19} />
                      </span>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-text-muted">
                          {item.label}
                        </div>
                        <div className="mt-0.5 font-medium text-text">{item.value}</div>
                      </div>
                    </div>
                  );
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a href={item.href} className="block">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Harita placeholder */}
              <div className="mt-6 flex h-48 items-center justify-center rounded-2xl border bg-surface/40 text-sm text-text-muted">
                {/* [DOLDUR] İsteğe bağlı: Google Maps embed iframe'i buraya ekleyin */}
                <span className="flex items-center gap-2">
                  <MapPin size={16} /> {c.info.address}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Form sütunu */}
          <Reveal delay={0.08}>
            <ContactForm locale={locale} dict={dict} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
