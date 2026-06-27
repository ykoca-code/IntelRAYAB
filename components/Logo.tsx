import type { CSSProperties } from 'react';

type LogoProps = {
  /** Toplam yükseklik (px). Sembol bu yüksekliğe göre ölçeklenir. */
  size?: number;
  /** Kelime işaretini gösterir; false ise yalnız sembol. */
  withWordmark?: boolean;
  /** Açık zemin varyantı (Intel kelimesi koyu olur). */
  light?: boolean;
  className?: string;
  style?: CSSProperties;
};

let uid = 0;

/**
 * IntelRAYAB logosu.
 * Sembol: ima edilen bir altıgen içinde, merkezi parlayan bir düğümden çıkan
 * ışınlar/bağlantılar (nöral ağ + "ray/ışın" çağrışımı). Mavi→camgöbeği gradient
 * ve tek bir ince altın aksan. 24px'te ve favicon olarak net okunur.
 */
export function Logo({
  size = 32,
  withWordmark = true,
  light = false,
  className,
  style,
}: LogoProps) {
  const id = `logo-${uid++}`;
  const gradId = `${id}-grad`;
  const glowId = `${id}-glow`;

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.34, ...style }}
    >
      <LogoMark size={size} gradId={gradId} glowId={glowId} />
      {withWordmark && (
        <span
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: size * 0.62,
            lineHeight: 1,
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontWeight: 400, color: light ? '#0a0e17' : '#f1f5f9' }}>Intel</span>
          <span
            style={{
              fontWeight: 700,
              backgroundImage: 'linear-gradient(135deg, #2563eb, #06b6d4 60%, #c8a55b)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            RAYAB
          </span>
        </span>
      )}
    </span>
  );
}

function LogoMark({
  size,
  gradId,
  glowId,
}: {
  size: number;
  gradId: string;
  glowId: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="IntelRAYAB"
    >
      <defs>
        <linearGradient id={gradId} x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
        <radialGradient id={glowId} cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#67E8F9" />
          <stop offset="1" stopColor="#2563EB" />
        </radialGradient>
      </defs>

      {/* İma edilen altıgen çerçeve */}
      <path
        d="M24 3.5 41.7 13.75v20.5L24 44.5 6.3 34.25v-20.5L24 3.5Z"
        stroke={`url(#${gradId})`}
        strokeWidth="1.6"
        strokeOpacity="0.55"
        strokeLinejoin="round"
      />

      {/* Bağlantı ışınları (merkezden dışa) */}
      <g stroke={`url(#${gradId})`} strokeWidth="1.6" strokeLinecap="round">
        <line x1="24" y1="24" x2="24" y2="10.5" />
        <line x1="24" y1="24" x2="35.5" y2="17.5" />
        <line x1="24" y1="24" x2="35.5" y2="30.5" />
        <line x1="24" y1="24" x2="24" y2="37.5" />
        <line x1="24" y1="24" x2="12.5" y2="30.5" />
        <line x1="24" y1="24" x2="12.5" y2="17.5" />
      </g>

      {/* Uç düğümler */}
      <g fill={`url(#${gradId})`}>
        <circle cx="24" cy="10.5" r="2.1" />
        <circle cx="35.5" cy="17.5" r="2.1" />
        <circle cx="35.5" cy="30.5" r="2.1" />
        <circle cx="24" cy="37.5" r="2.1" />
        <circle cx="12.5" cy="30.5" r="2.1" />
        <circle cx="12.5" cy="17.5" r="2.1" />
      </g>

      {/* Altın aksan çizgisi */}
      <line x1="24" y1="24" x2="35.5" y2="17.5" stroke="#C8A55B" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="35.5" cy="17.5" r="2.1" fill="#C8A55B" />

      {/* Merkez parlayan düğüm */}
      <circle cx="24" cy="24" r="5.2" fill={`url(#${glowId})`} />
      <circle cx="24" cy="24" r="2.4" fill="#F0FBFF" />
    </svg>
  );
}
