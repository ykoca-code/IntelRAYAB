import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        surface: 'var(--surface)',
        primary: {
          DEFAULT: 'var(--primary-from)',
          from: 'var(--primary-from)',
          to: 'var(--primary-to)',
        },
        gold: 'var(--gold)',
        text: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'var(--font-inter)', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, var(--primary-from), var(--primary-to))',
        'gold-gradient': 'linear-gradient(135deg, var(--gold), #E6C988)',
      },
      boxShadow: {
        glow: '0 0 32px -14px rgba(29, 78, 216, 0.4)',
        'glow-cyan': '0 0 36px -14px rgba(2, 132, 199, 0.35)',
        card: '0 10px 34px -16px rgba(0, 0, 0, 0.55)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(3%, -4%) scale(1.05)' },
          '66%': { transform: 'translate(-3%, 3%) scale(0.97)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        aurora: 'aurora 18s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
