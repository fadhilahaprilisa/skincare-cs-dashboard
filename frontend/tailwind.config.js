/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ===== SURFACE TIERS =====
        'surface': '#051424',
        'surface-dim': '#051424',
        'surface-bright': '#2c3a4c',
        'surface-container-lowest': '#010f1f',
        'surface-container-low': '#0d1c2d',
        'surface-container': '#122131',
        'surface-container-high': '#1c2b3c',
        'surface-container-highest': '#273647',
        'surface-variant': '#273647',
        
        // ===== TEXT & OUTLINE =====
        'on-surface': '#d4e4fa',
        'on-surface-variant': '#b9cacb',
        'on-background': '#d4e4fa',
        'outline': '#849495',
        'outline-variant': '#3a494b',
        
        // ===== PRIMARY (LUMIÈRE CYAN) =====
        'primary': '#e0fdff',
        'on-primary': '#00373a',
        'primary-container': '#00f2fe',
        'on-primary-container': '#006a70',
        'primary-fixed': '#6ff6ff',
        'primary-fixed-dim': '#00dce6',
        'on-primary-fixed': '#002022',
        'on-primary-fixed-variant': '#004f53',
        'inverse-primary': '#00696f',
        'surface-tint': '#00dce6',
        
        // ===== SECONDARY (SOFT ROSE PEARL) =====
        'secondary': '#d1c3c8',
        'on-secondary': '#362e32',
        'secondary-container': '#4e4448',
        'on-secondary-container': '#bfb2b6',
        'secondary-fixed': '#eddfe4',
        'secondary-fixed-dim': '#d1c3c8',
        'on-secondary-fixed': '#211a1d',
        'on-secondary-fixed-variant': '#4e4448',
        
        // ===== TERTIARY =====
        'tertiary': '#fbf5ff',
        'on-tertiary': '#352a52',
        'tertiary-container': '#e2d4ff',
        'on-tertiary-container': '#655984',
        'tertiary-fixed': '#e9ddff',
        'tertiary-fixed-dim': '#cebff0',
        'on-tertiary-fixed': '#1f143b',
        'on-tertiary-fixed-variant': '#4c406a',
        
        // ===== FUNCTIONAL / STATUS =====
        'error': '#ffb4ab',
        'on-error': '#690005',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',
        
        'background': '#051424',
        'inverse-surface': '#d4e4fa',
        'inverse-on-surface': '#233143',
        
        // ===== BRAND CUSTOM (dari mockup) =====
        'brand-cyan': '#00f2fe',
        'brand-violet': '#7B2CBF',
        'brand-deep': '#110924',
        'brand-rose': '#FFF0F5',
        
        // ===== STATUS SEMANTIC =====
        'status-urgent': '#FF4D4D',
        'status-pending': '#FFC048',
        'status-resolved': '#2ED573',
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'sm': '0.25rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        'full': '9999px',
      },
      spacing: {
        'gutter': '1.5rem',
        'gutter-mobile': '0.75rem',
        'margin': '2rem',
        'margin-mobile': '1rem',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2rem',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['36px', { lineHeight: '44px', letterSpacing: '-0.025em', fontWeight: '700' }],
        'headline-lg': ['28px', { lineHeight: '36px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-lg-mobile': ['24px', { lineHeight: '32px', letterSpacing: '-0.015em', fontWeight: '600' }],
        'headline-md': ['20px', { lineHeight: '28px', letterSpacing: '-0.015em', fontWeight: '600' }],
        'headline-sm': ['16px', { lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-sm': ['12px', { lineHeight: '16px', letterSpacing: '0.01em', fontWeight: '400' }],
        'label-md': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }],
        'label-sm': ['11px', { lineHeight: '14px', letterSpacing: '0.06em', fontWeight: '600' }],
        'code-sm': ['12px', { lineHeight: '16px', fontWeight: '500' }],
      },
      boxShadow: {
        'cyan-glow': '0 0 16px rgba(0, 242, 254, 0.4)',
        'cyan-glow-lg': '0 0 24px rgba(0, 242, 254, 0.45)',
        'cyan-inset': 'inset 0 0 12px 0 rgba(0, 242, 254, 0.08), 0 0 20px -2px rgba(0, 242, 254, 0.15)',
        'card-ambient': '0 8px 24px -4px rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-cyan': 'pulseCyan 2s ease-in-out infinite',
      },
      keyframes: {
        pulseCyan: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}