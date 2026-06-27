import Link from 'next/link';
import { Linkedin, Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { localizedPath, type Dictionary, type Locale, type RouteKey } from '@/lib/i18n';

const companyLinks: { key: RouteKey; label: keyof Dictionary['nav'] }[] = [
  { key: 'services', label: 'services' },
  { key: 'advisors', label: 'advisors' },
  { key: 'pricing', label: 'pricing' },
  { key: 'assessment', label: 'assessment' },
  { key: 'sectors', label: 'sectors' },
  { key: 'integrations', label: 'integrations' },
  { key: 'references', label: 'references' },
  { key: 'about', label: 'about' },
];

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-surface/40">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marka */}
          <div className="lg:col-span-1">
            <Logo size={30} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              {dict.footer.tagline}
            </p>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-lg border text-text-muted transition-colors hover:border-white/25 hover:text-text"
            >
              <Linkedin size={17} />
            </a>
          </div>

          {/* Şirket */}
          <div>
            <h3 className="text-sm font-semibold text-text">{dict.footer.company}</h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map(({ key, label }) => (
                <li key={key}>
                  <Link
                    href={localizedPath(locale, key)}
                    className="text-sm text-text-muted transition-colors hover:text-text"
                  >
                    {dict.nav[label]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-sm font-semibold text-text">{dict.footer.contactTitle}</h3>
            <ul className="mt-4 space-y-3 text-sm text-text-muted">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary-to" />
                <span>{dict.footer.location}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-primary-to" />
                <a href={`mailto:${dict.contact.info.email}`} className="hover:text-text">
                  {dict.contact.info.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Yasal */}
          <div>
            <h3 className="text-sm font-semibold text-text">{dict.footer.legalTitle}</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href={localizedPath(locale, 'privacy')}
                  className="text-sm text-text-muted transition-colors hover:text-text"
                >
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedPath(locale, 'contact')}
                  className="text-sm text-text-muted transition-colors hover:text-text"
                >
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs text-text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {dict.footer.legalName}. {dict.footer.rights}
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-gold-gradient font-semibold">RAYAB</span>
            <span>· Teknopark İstanbul</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
