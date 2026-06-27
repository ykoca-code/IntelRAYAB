import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { basePath } from '@/lib/i18n';
import './globals.css';

// latin-ext alt kümesi Türkçe karakterleri (ğ, ş, ı, İ, ç, ö, ü) kapsar.
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ykoca-code.github.io'),
  title: {
    default: 'IntelRAYAB',
    template: '%s',
  },
  description: 'Aile şirketinin yapay zekâ aklı.',
  icons: {
    icon: [{ url: `${basePath}/favicon.svg`, type: 'image/svg+xml' }],
    // [DOLDUR] Apple cihazları için 180x180 PNG eklemek isterseniz public/apple-touch-icon.png
    // oluşturup buraya `apple: \`${basePath}/apple-touch-icon.png\`` ekleyin.
    apple: [{ url: `${basePath}/favicon.svg` }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="bg-ink text-text antialiased">{children}</body>
    </html>
  );
}
