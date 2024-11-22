/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  safelist: [
    'bg-blue-500',
    'bg-indigo-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-rose-500',
    'bg-amber-500',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          light: 'var(--primary-light)',
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
        },
        secondary: {
          light: 'var(--secondary-light)',
          DEFAULT: 'var(--secondary)',
          dark: 'var(--secondary-dark)',
        },
        success: {
          light: 'var(--success-light)',
          DEFAULT: 'var(--success)',
          dark: 'var(--success-dark)',
        },
        warning: {
          light: 'var(--warning-light)',
          DEFAULT: 'var(--warning)',
          dark: 'var(--warning-dark)',
        },
        error: {
          light: 'var(--error-light)',
          DEFAULT: 'var(--error)',
          dark: 'var(--error-dark)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
