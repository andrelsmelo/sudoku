import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow-0': 'bounce-slow 2s infinite 0s',
        'bounce-slow-1': 'bounce-slow 2s infinite 0.1s',
        'bounce-slow-2': 'bounce-slow 2s infinite 0.2s',
        'bounce-slow-3': 'bounce-slow 2s infinite 0.3s',
        'bounce-slow-4': 'bounce-slow 2s infinite 0.4s',
        'bounce-slow-5': 'bounce-slow 2s infinite 0.5s',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
