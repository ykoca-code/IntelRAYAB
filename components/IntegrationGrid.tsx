import * as simpleIcons from 'simple-icons';
import type { Dictionary } from '@/lib/i18n';
import { Reveal, Stagger, StaggerItem } from './ui';

type SimpleIcon = { title: string; hex: string; path: string };

function lookupIcon(slug: string): SimpleIcon | null {
  if (!slug) return null;
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const icon = (simpleIcons as Record<string, unknown>)[key] as SimpleIcon | undefined;
  return icon ?? null;
}

/** Tek bir marka çipi: simple-icons varsa monokrom SVG, yoksa isimli temiz çip. */
function BrandChip({ name, slug }: { name: string; slug: string }) {
  const icon = lookupIcon(slug);

  return (
    <div className="glass-card glass-card-hover flex items-center gap-3 px-4 py-3.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center">
        {icon ? (
          <svg
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-text-muted transition-colors group-hover:fill-text"
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-gradient text-[11px] font-bold text-white"
          >
            {name.charAt(0)}
          </span>
        )}
      </span>
      <span className="text-sm font-medium text-text">{name}</span>
    </div>
  );
}

export function IntegrationGrid({ dict }: { dict: Dictionary }) {
  return (
    <div className="space-y-12">
      {dict.integrations.categories.map((cat) => (
        <Reveal key={cat.name}>
          <div>
            <h3 className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
              <span className="h-px w-6 bg-gold-gradient" />
              {cat.name}
            </h3>
            <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {cat.items.map((item) => (
                <StaggerItem key={item.name} className="group">
                  <BrandChip name={item.name} slug={item.slug} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
