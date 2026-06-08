/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        background: '#f8f9fa',
        brand: '#FF4500',
        black: '#060B18',
      },
      boxShadow: {
        'neo-sm': '4px 4px 0px 0px rgba(6, 11, 24, 1)',
        'neo': '8px 8px 0px 0px rgba(6, 11, 24, 1)',
        'neo-lg': '12px 12px 0px 0px rgba(6, 11, 24, 1)',
        'neo-white': '8px 8px 0px 0px rgba(248, 249, 250, 1)',
        'neo-brand': '8px 8px 0px 0px rgba(255, 69, 0, 1)',
        'neo-pressed': '2px 2px 0px 0px rgba(6, 11, 24, 1)',
        'none-hard': '0px 0px 0px 0px rgba(6, 11, 24, 1)',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'marquee': 'marquee-left 18s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'blink': 'blink 1s step-start infinite',
      },
    },
  },
  plugins: [],
}
