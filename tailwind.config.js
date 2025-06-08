/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate'

export default {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#FF69B4',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: '#DDA0DD',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				accent: {
					DEFAULT: '#FFB6C1',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				// Crissel Studio custom colors (authentic brand palette)
				crissel: {
					coral: '#E57373',        // Main brand coral from their images
					pink: '#F8BBD9',         // Light pink from their branding
					rose: '#F48FB1',         // Medium rose tone
					blush: '#FCE4EC',        // Very light blush
					cream: '#FFF8F0',        // Warm cream background
					warm: '#FAFAFA',         // Clean warm white
					gray: '#616161',         // Text gray
					gold: '#D4AF37',         // Gold accent from logo border
					dark: '#2D3748'          // Dark text
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'fade-in': {
					from: { opacity: 0, transform: 'translateY(20px)' },
					to: { opacity: 1, transform: 'translateY(0)' },
				},
				'fade-in-up': {
					from: { opacity: 0, transform: 'translateY(40px)' },
					to: { opacity: 1, transform: 'translateY(0)' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'gentle-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(255, 105, 180, 0.3)' },
					'50%': { boxShadow: '0 0 20px rgba(255, 105, 180, 0.6)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-up': 'fade-in-up 0.8s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'gentle-bounce': 'gentle-bounce 2s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
			},
		},
	},
	plugins: [animate],
}