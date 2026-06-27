'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/* ---------------------------------- Button --------------------------------- */

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  external?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-gradient text-white shadow-glow hover:shadow-glow-cyan hover:brightness-110',
  secondary:
    'border bg-white/[0.04] text-text hover:bg-white/[0.08] hover:border-white/25',
  ghost: 'text-text-muted hover:text-text',
};

export function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled,
  onClick,
  external,
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

/* ------------------------------ Section header ----------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <Reveal>
      <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
        {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
        <h2
          className={`font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] ${
            light ? '' : 'text-text'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">{subtitle}</p>
        )}
      </div>
    </Reveal>
  );
}

/* -------------------------------- Reveal ----------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------- Stagger group ------------------------------- */

export function Stagger({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
