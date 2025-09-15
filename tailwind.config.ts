import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(230, 30%, 95%)',
        foreground: 'hsl(230, 25%, 20%)',
        accent: 'hsl(170, 80%, 45%)',
        border: 'hsl(230, 20%, 85%)',
        primary: 'hsl(240, 90%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      boxShadow: {
        card: '0 4px 16px hsla(0, 0%, 0%, 0.08)',
        focus: '0 0 0 3px hsl(170, 80%, 45%)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
export default config
