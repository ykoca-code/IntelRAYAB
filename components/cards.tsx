import { Check } from 'lucide-react';
import { getIcon } from '@/lib/icons';

/* ------------------------------- ServiceCard ------------------------------- */

export function ServiceCard({
  icon,
  title,
  desc,
  outcomes,
  outcomesLabel,
}: {
  icon: string;
  title: string;
  desc: string;
  outcomes: string[];
  outcomesLabel: string;
}) {
  const Icon = getIcon(icon);
  return (
    <div className="glass-card glass-card-hover group flex h-full flex-col p-6">
      <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-gradient text-white shadow-glow">
        <Icon size={22} />
      </span>
      <h3 className="font-display text-lg font-semibold text-text">{title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-text-muted">{desc}</p>
      <div className="mt-5 border-t pt-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          {outcomesLabel}
        </p>
        <ul className="space-y-1.5">
          {outcomes.map((o) => (
            <li key={o} className="flex items-start gap-2 text-sm text-text">
              <Check size={15} className="mt-0.5 shrink-0 text-primary-to" />
              {o}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------- AdvisorCard ------------------------------- */

export function AdvisorCard({
  icon,
  title,
  desc,
  tasks,
  tasksLabel,
  featured,
  featuredLabel,
}: {
  icon: string;
  title: string;
  desc: string;
  tasks: string[];
  tasksLabel: string;
  featured?: boolean;
  featuredLabel?: string;
}) {
  const Icon = getIcon(icon);
  return (
    <div
      className={`glass-card glass-card-hover group relative flex h-full flex-col p-6 ${
        featured ? 'border-gold/40 shadow-glow' : ''
      }`}
    >
      {featured && featuredLabel && (
        <span className="absolute -top-3 right-5 rounded-full bg-gold-gradient px-3 py-1 text-[11px] font-bold text-ink">
          {featuredLabel}
        </span>
      )}
      <span
        className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white ${
          featured ? 'bg-gold-gradient !text-ink' : 'bg-primary-gradient shadow-glow'
        }`}
      >
        <Icon size={22} />
      </span>
      <h3 className="font-display text-lg font-semibold text-text">{title}</h3>
      <p className="mt-2 text-sm text-text-muted">{desc}</p>
      <div className="mt-5 border-t pt-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          {tasksLabel}
        </p>
        <ul className="space-y-1.5">
          {tasks.map((task) => (
            <li key={task} className="flex items-start gap-2 text-sm text-text">
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                  featured ? 'bg-gold' : 'bg-primary-to'
                }`}
              />
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* -------------------------------- SectorCard ------------------------------- */

export function SectorCard({
  icon,
  name,
  useCase,
}: {
  icon: string;
  name: string;
  useCase: string;
}) {
  const Icon = getIcon(icon);
  return (
    <div className="glass-card glass-card-hover group flex h-full items-start gap-4 p-5">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-white/[0.03] text-primary-to transition-colors group-hover:border-primary-to/40">
        <Icon size={20} />
      </span>
      <div>
        <h3 className="font-display text-base font-semibold text-text">{name}</h3>
        <p className="mt-1 text-sm text-text-muted">{useCase}</p>
      </div>
    </div>
  );
}
