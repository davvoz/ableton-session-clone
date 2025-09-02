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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				background: {
					DEFAULT: 'hsl(var(--background))',
					secondary: 'hsl(var(--background-secondary))',
					tertiary: 'hsl(var(--background-tertiary))'
				},
				foreground: {
					DEFAULT: 'hsl(var(--foreground))',
					muted: 'hsl(var(--foreground-muted))',
					subtle: 'hsl(var(--foreground-subtle))'
				},
				clip: {
					orange: 'hsl(var(--clip-orange))',
					blue: 'hsl(var(--clip-blue))',
					green: 'hsl(var(--clip-green))',
					red: 'hsl(var(--clip-red))',
					yellow: 'hsl(var(--clip-yellow))',
					purple: 'hsl(var(--clip-purple))',
					pink: 'hsl(var(--clip-pink))',
					cyan: 'hsl(var(--clip-cyan))'
				},
				transport: {
					play: 'hsl(var(--transport-play))',
					record: 'hsl(var(--transport-record))',
					stop: 'hsl(var(--transport-stop))'
				},
				hover: 'hsl(var(--hover))',
				active: 'hsl(var(--active))',
				selected: 'hsl(var(--selected))'
			},
			fontFamily: {
				mono: 'var(--font-mono)'
			},
			spacing: {
				'grid': 'var(--grid-size)',
				'track': 'var(--track-width)'
			},
			transitionDuration: {
				'fast': 'var(--transition-fast)',
				'smooth': 'var(--transition-smooth)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;