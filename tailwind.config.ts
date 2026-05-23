import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          beige: '#F5EFE6',
          beigeLight: '#FAF7F3',
          brown: '#3D1F1F',
          brownMid: '#7A4A2A',
          brownLight: '#C4956A',
          orange: '#E8651A',
          white: '#FFFFFF',
          gray: '#6B7280',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out both',
        'fade-up-delay': 'fadeUp 0.8s ease-out 0.18s both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
