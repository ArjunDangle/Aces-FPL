import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
			screens: {
				'2xl': '1100px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['"Premier Sans"', '"Inter"', '"Poppins"', 'system-ui', 'sans-serif'],
        		brand: ['"Cinzel"', 'serif'],
			},
			colors: {
				// FPL Brand Colors
				'pl-purple': {
					DEFAULT: 'hsl(var(--pl-purple))',
					900: 'hsl(var(--pl-purple-900))',
					800: 'hsl(var(--pl-purple-800))',
				},
				'pl-cyan': 'hsl(var(--pl-cyan))',
				'pl-green': 'hsl(var(--pl-green))',
				'pl-pink': 'hsl(var(--pl-pink))',
				'pl-white': 'hsl(var(--pl-white))',
				
				// Pitch Colors
				'pitch-top': 'hsl(var(--pitch-top))',
				'pitch-bottom': 'hsl(var(--pitch-bottom))',
				'pitch-line': 'hsl(var(--pitch-line))',
				
				// FDR Colors
				'fdr-easy': 'hsl(var(--fdr-easy))',
				'fdr-medium': 'hsl(var(--fdr-medium))',
				'fdr-hard': 'hsl(var(--fdr-hard))',

        // Custom Colors
        'fpl-card-purple-start': '#23003F',
        'fpl-card-purple-end': '#300050',
        'fpl-page-purple-start': '#0A001F',
        'fpl-page-purple-end': '#1B0033',
        'fpl-highlight-teal': '#00DFA2',
        'fpl-highlight-green': '#00FFC6',
        'fpl-text-gray': '#AAAAAA',
				
				// Semantic tokens
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '20px',
				'3xl': '24px'
			},
			boxShadow: {
				'card': 'var(--shadow-card)',
				'glow-cyan': 'var(--shadow-glow-cyan)',
				'glow-green': 'var(--shadow-glow-green)',
				'glow-pink': 'var(--shadow-glow-pink)',
			},
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-pitch': 'var(--gradient-pitch)',
				'gradient-card': 'var(--gradient-card)',
        'gradient-stats-blue': 'linear-gradient(135deg, #00CFFF, #00FF87)',
        'gradient-page-purple': 'linear-gradient(180deg, #0A001F, #1B0033)',
        'gradient-card-purple': 'linear-gradient(180deg, #23003F, #300050)',
        'gradient-highlight-teal': 'linear-gradient(135deg, #00DFA2, #00FFC6)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'count-up': {
					from: { opacity: '0', transform: 'translateY(8px) scale(0.95)' },
					to: { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				'fade-in-up': {
					from: { opacity: '0', transform: 'translateY(8px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'spring-in': {
					from: { opacity: '0', transform: 'scale(0.95)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 0 1px hsl(var(--pl-cyan) / 0.2)' },
					'50%': { boxShadow: '0 0 0 1px hsl(var(--pl-cyan) / 0.4), 0 0 20px hsl(var(--pl-cyan) / 0.2)' }
				},
				'slide-up': {
					from: { transform: 'translateY(100%)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					from: { transform: 'translateY(0)', opacity: '1' },
					to: { transform: 'translateY(100%)', opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'count-up': 'count-up 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'fade-in-up': 'fade-in-up 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'spring-in': 'spring-in 280ms cubic-bezier(0.34, 1.56, 0.64, 1)',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'slide-up': 'slide-up 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'slide-down': 'slide-down 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			},
			transitionDuration: {
				'smooth': '280ms',
				'fast': '160ms',
				'spring': '320ms',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
