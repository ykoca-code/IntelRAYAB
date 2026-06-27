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
        glow: '0 0 40px -10px rgba(37, 99, 235, 0.45)',
        'glow-cyan': '0 0 50px -12px rgba(6, 182, 212, 0.4)',
        card: '0 8px 30px -12px rgba(0, 0, 0, 0.5)',
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
