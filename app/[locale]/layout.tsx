import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HtmlLang } from '@/components/HtmlLang';
import {
  getDictionary,
  isLocale,
  locales,
  type Locale,
} from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : 'tr';
  const dict = getDictionary(locale);
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    alternates: {
      languages: {
        tr: 'https://ykoca-code.github.io/IntelRAYAB/tr',
        en: 'https://ykoca-code.github.io/IntelRAYAB/en',
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'IntelRAYAB',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'IntelRAYAB',
    legalName: 'RAYAB YZ REİS BİLİŞİM A.Ş.',
    description: dict.meta.home.description,
    url: 'https://ykoca-code.github.io/IntelRAYAB/',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pendik',
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
      streetAddress: 'Teknopark İstanbul',
    },
    email: 'info@intelrayab.com',
    sameAs: ['https://www.linkedin.com/'],
  };

  return (
    <>
      <HtmlLang locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary-gradient focus:px-4 focus:py-2 focus:text-white"
      >
        {dict.common.skipToContent}
      </a>
      <Header locale={locale} dict={dict} />
      <main id="main">{children}</main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
