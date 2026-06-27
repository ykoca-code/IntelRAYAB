'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check, RotateCcw, Sparkles, Gauge } from 'lucide-react';
import { Button } from './ui';
import { localizedPath, type Dictionary, type Locale } from '@/lib/i18n';

type Phase = 'intro' | 'quiz' | 'result';

export function ReadinessAssessment({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const a = dict.assessment;
  const questions = a.questions;
  const total = questions.length;
  const maxScore = total * 3;

  const [phase, setPhase] = useState<Phase>('intro');
  const [step, setStep] = useState(0);
  // Seçilen şıkkın index'i (her soru için), -1 = henüz seçilmedi
  const [answers, setAnswers] = useState<number[]>(() => Array(total).fill(-1));

  const result = useMemo(() => {
    let score = 0;
    const moduleSet = new Set<string>();
    answers.forEach((optIdx, qIdx) => {
      if (optIdx < 0) return;
      const opt = questions[qIdx].options[optIdx];
      score += opt.score;
      opt.modules.forEach((m) => moduleSet.add(m));
    });
    const band = a.result.bands.find((b) => score <= b.max) ?? a.result.bands[a.result.bands.length - 1];
    const pct = Math.round((score / maxScore) * 100);
    return { score, pct, band, modules: Array.from(moduleSet) };
  }, [answers, questions, a.result.bands, maxScore]);

  function selectOption(optIdx: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = optIdx;
      return next;
    });
  }

  function goNext() {
    if (step < total - 1) setStep((s) => s + 1);
    else setPhase('result');
  }

  function restart() {
    setAnswers(Array(total).fill(-1));
    setStep(0);
    setPhase('intro');
  }

  /* --------------------------------- Intro --------------------------------- */
  if (phase === 'intro') {
    return (
      <div className="glass-card mx-auto max-w-2xl p-8 text-center sm:p-12">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-gradient text-white shadow-glow">
          <Gauge size={26} />
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold text-text">{a.hero.title}</h2>
        <p className="mt-3 text-text-muted">{a.hero.subtitle}</p>
        <p className="mt-6 text-sm text-text-muted">{a.intro}</p>
        <div className="mt-8 flex justify-center">
          <Button variant="primary" className="!px-7 !py-3.5" onClick={() => setPhase('quiz')}>
            {a.start}
            <ArrowRight size={17} />
          </Button>
        </div>
      </div>
    );
  }

  /* --------------------------------- Result -------------------------------- */
  if (phase === 'result') {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="glass-card overflow-hidden p-8 sm:p-10">
          {/* Skor */}
          <div className="text-center">
            <span className="eyebrow mb-4">
              <Sparkles size={13} className="text-primary-to" />
              {a.result.title}
            </span>
            <div className="mt-2 font-display text-5xl font-bold text-gradient">{result.band.level}</div>
            <p className="mt-2 text-sm text-text-muted">
              {a.result.scoreLabel}: <span className="font-semibold text-text">{result.score}</span> / {maxScore}
            </p>

            {/* İlerleme çubuğu */}
            <div className="mx-auto mt-5 h-2.5 w-full max-w-sm overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-primary-gradient transition-all duration-700"
                style={{ width: `${result.pct}%` }}
              />
            </div>
          </div>

          <p className="mt-7 text-center leading-relaxed text-text-muted">{result.band.summary}</p>

          {/* Önerilen modüller */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-sm font-semibold text-text">{a.result.recommendedTitle}</h3>
            {result.modules.length > 0 ? (
              <ul className="mt-4 space-y-2.5">
                {result.modules.map((m) => (
                  <li key={m}>
                    <Link
                      href={localizedPath(locale, m === 'advisors' ? 'advisors' : 'services')}
                      className="group flex items-center justify-between rounded-xl border bg-white/[0.03] px-4 py-3 transition-colors hover:border-primary-to/40 hover:bg-white/[0.06]"
                    >
                      <span className="flex items-center gap-2.5 text-sm font-medium text-text">
                        <Check size={16} className="text-primary-to" />
                        {a.modules[m as keyof typeof a.modules] ?? m}
                      </span>
                      <ArrowRight
                        size={15}
                        className="text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-text"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-text-muted">{a.result.noModules}</p>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card mt-6 p-8 text-center">
          <h3 className="font-display text-xl font-bold text-text">{a.result.ctaTitle}</h3>
          <p className="mx-auto mt-3 max-w-lg text-sm text-text-muted">{a.result.ctaText}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={localizedPath(locale, 'contact')} variant="primary" className="!px-6 !py-3.5">
              {a.result.cta}
              <ArrowRight size={16} />
            </Button>
            <Button href={localizedPath(locale, 'pricing')} variant="secondary" className="!px-6 !py-3.5">
              {a.result.viewPricing}
            </Button>
          </div>
          <button
            type="button"
            onClick={restart}
            className="mt-6 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
          >
            <RotateCcw size={14} /> {a.restart}
          </button>
        </div>
      </div>
    );
  }

  /* ---------------------------------- Quiz --------------------------------- */
  const q = questions[step];
  const selected = answers[step];
  const progress = Math.round(((step + 1) / total) * 100);

  return (
    <div className="glass-card mx-auto max-w-2xl p-7 sm:p-9">
      {/* İlerleme */}
      <div className="mb-7">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-text-muted">
          <span>
            {a.questionLabel} {step + 1} {a.of} {total}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-primary-gradient transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="font-display text-xl font-semibold leading-snug text-text sm:text-2xl">
        {q.question}
      </h2>

      <div className="mt-6 space-y-3">
        {q.options.map((opt, i) => {
          const active = selected === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => selectOption(i)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all ${
                active
                  ? 'border-primary-to/60 bg-primary-to/10 text-text shadow-glow'
                  : 'bg-white/[0.02] text-text-muted hover:border-white/20 hover:text-text'
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  active ? 'border-primary-to bg-primary-gradient' : 'border-white/25'
                }`}
              >
                {active && <Check size={12} className="text-white" />}
              </span>
              {opt.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => (step > 0 ? setStep((s) => s - 1) : setPhase('intro'))}
          className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-text"
        >
          <ArrowLeft size={15} /> {a.back}
        </button>
        <Button variant="primary" disabled={selected < 0} onClick={goNext} className="!px-6 !py-3">
          {step < total - 1 ? a.next : a.seeResult}
          <ArrowRight size={15} />
        </Button>
      </div>
    </div>
  );
}
