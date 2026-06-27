'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui';
import { localizedPath, type Dictionary, type Locale } from '@/lib/i18n';

/**
 * [DOLDUR] — Web3Forms access key.
 * https://web3forms.com adresinden ücretsiz alın ve buraya yapıştırın
 * (ya da NEXT_PUBLIC_WEB3FORMS_KEY ortam değişkeniyle geçin).
 * Anahtar girilmezse form, doğrudan e-posta (mailto) yedeğine yönlendirir.
 */
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.contact.form;
  const [status, setStatus] = useState<Status>('idle');

  const keyMissing = WEB3FORMS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY';

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Anahtar yoksa mailto yedeğine düş
    if (keyMissing) {
      const subject = encodeURIComponent(`IntelRAYAB — ${data.get('name') || ''}`);
      const body = encodeURIComponent(
        `${t.name}: ${data.get('name') || ''}\n` +
          `${t.company}: ${data.get('company') || ''}\n` +
          `${t.position}: ${data.get('position') || ''}\n` +
          `${t.email}: ${data.get('email') || ''}\n` +
          `${t.phone}: ${data.get('phone') || ''}\n\n` +
          `${data.get('message') || ''}`
      );
      window.location.href = `mailto:${dict.contact.info.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('submitting');
    data.append('access_key', WEB3FORMS_KEY);
    data.append('subject', `IntelRAYAB — ${data.get('name') || ''}`);
    data.append('from_name', 'IntelRAYAB Web Sitesi');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="glass-card flex flex-col items-center gap-4 p-10 text-center">
        <CheckCircle2 className="text-primary-to" size={48} />
        <p className="text-lg font-medium text-text">{t.success}</p>
        <Button variant="secondary" onClick={() => setStatus('idle')}>
          OK
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-card space-y-5 p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.name} name="name" required />
        <Field label={t.company} name="company" required />
        <Field label={t.position} name="position" />
        <Field label={t.email} name="email" type="email" required />
        <Field label={t.phone} name="phone" type="tel" className="sm:col-span-2" />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text">
          {t.message} <span className="text-primary-to">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder={t.messagePlaceholder}
          className="w-full resize-y rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-text placeholder:text-text-muted/60 focus:border-primary-to focus:outline-none"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-text-muted">
        <input
          type="checkbox"
          name="kvkk"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 accent-[var(--primary-to)]"
        />
        <span>
          {t.kvkk}{' '}
          <Link href={localizedPath(locale, 'privacy')} className="text-primary-to underline">
            ({t.kvkkLink})
          </Link>
        </span>
      </label>

      {status === 'error' && (
        <p className="flex items-center gap-2 text-sm text-red-400">
          <AlertCircle size={16} /> {t.error}
        </p>
      )}

      {keyMissing && (
        <p className="rounded-lg border border-gold/30 bg-gold/5 px-3 py-2 text-xs text-text-muted">
          ⚙️ [DOLDUR] Form servisi henüz bağlanmadı; gönderim doğrudan e-posta uygulamanızı açar.
        </p>
      )}

      <Button type="submit" variant="primary" className="w-full !py-3.5" disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <Loader2 size={16} className="animate-spin" /> {t.submitting}
          </>
        ) : (
          <>
            <Send size={16} /> {t.submit}
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  className = '',
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-text">
        {label} {required && <span className="text-primary-to">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-text placeholder:text-text-muted/60 focus:border-primary-to focus:outline-none"
      />
    </div>
  );
}
