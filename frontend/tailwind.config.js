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
        // ===== SURFACE TIERS (Bright Clean Off-White) =====
        'surface': '#F8FAFC',
        'surface-dim': '#F1F5F9',
        'surface-bright': '#FFFFFF',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#F8FAFC',
        'surface-container': '#F1F5F9',
        'surface-container-high': '#E2E8F0',
        'surface-container-highest': '#CBD5E1',
        'surface-variant': '#F1F5F9',
        
        // ===== TEXT & OUTLINE (High Contrast Slate) =====
        'on-surface': '#0F172A',
        'on-surface-variant': '#64748B',
        'on-background': '#0F172A',
        'outline': '#CBD5E1',
        'outline-variant': '#E2E8F0',
        
        // ===== PRIMARY =====
        'primary': '#0F172A',
        'on-primary': '#FFFFFF',
        'primary-container': '#141414',
        'on-primary-container': '#FFFFFF',
        'primary-fixed': '#1E293B',
        'primary-fixed-dim': '#334155',
        'on-primary-fixed': '#FFFFFF',
        'on-primary-fixed-variant': '#CBD5E1',
        'inverse-primary': '#F8FAFC',
        'surface-tint': '#0F172A',
        
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
        
        'background': '#F8FAFC',
        'inverse-surface': '#0F172A',
        'inverse-on-surface': '#F8FAFC',
        
        // ===== BRAND CUSTOM =====
        'brand-cyan': '#0284C7',
        'brand-violet': '#7C5CFF',
        'brand-deep': '#0F172A',
        'brand-rose': '#FFF0F5',
        
        // ===== STATUS SEMANTIC =====
        'status-urgent': '#EF4444',
        'status-pending': '#F59E0B',
        // ===== LUMIERE SIGNATURE DESIGN SYSTEM =====
        'lumiere-cyan': '#0284C7',
        'lumiere-dark': '#0F172A',
        'lumiere-violet': '#7C5CFF',
        'lumiere-lavender': '#C9B8FF',
        'lumiere-rose': '#FFF0F5',
        'lumiere-canvas': '#F8FAFC',
        'lumiere-card': '#FFFFFF',
        'lumiere-border': '#E2E8F0',
        'lumiere-border-violet': '#E2E8F0',
        'status-resolved': '#10B981',
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'sm': '0.25rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '1.75rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
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
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'serif': ['"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-2xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.03em', fontWeight: '700' }],
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
        'cyan-glow': '0 0 20px rgba(0, 242, 254, 0.35)',
        'cyan-glow-lg': '0 0 32px rgba(0, 242, 254, 0.45)',
        'cyan-inset': 'inset 0 0 12px 0 rgba(0, 242, 254, 0.08), 0 0 20px -2px rgba(0, 242, 254, 0.15)',
        'violet-glow': '0 0 24px rgba(124, 92, 255, 0.35)',
        'card-ambient': '0 8px 24px -4px rgba(0, 0, 0, 0.45)',
        'frosted': '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'frosted-cyan': '0 8px 32px 0 rgba(0, 242, 254, 0.1), inset 0 0 0 1px rgba(0, 242, 254, 0.25)',
      },
      animation: {
        'pulse-cyan': 'pulseCyan 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseCyan: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}