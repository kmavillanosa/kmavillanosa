/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/lib/esm/**/*.js',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
			},
			colors: {
				ivory: {
					50: '#FAF9F6',
					100: '#F5F3EF',
					200: '#EBE8E2',
					300: '#DDD9D1',
				},
				/* Semantic theme: use these in components. Values come from index.css (--theme-*). */
				theme: {
					page: 'var(--theme-bg-page)',
					surface: 'var(--theme-bg-surface)',
					elevated: 'var(--theme-bg-elevated)',
					'elevated-muted': 'var(--theme-bg-elevated-muted)',
					border: 'var(--theme-border)',
					'border-muted': 'var(--theme-border-muted)',
					'text-primary': 'var(--theme-text-primary)',
					'text-secondary': 'var(--theme-text-secondary)',
					'text-muted': 'var(--theme-text-muted)',
					accent: 'var(--theme-accent)',
					'accent-hover': 'var(--theme-accent-hover)',
					'accent-foreground': 'var(--theme-accent-foreground)',
					'cta-bg': 'var(--theme-cta-bg)',
					'cta-bg-hover': 'var(--theme-cta-bg-hover)',
					'hero-overlay': 'var(--theme-bg-hero-overlay)',
				},
			},
			borderColor: {
				theme: {
					DEFAULT: 'var(--theme-border)',
					muted: 'var(--theme-border-muted)',
				},
			},
		},
	},
	plugins: [
		require('flowbite/plugin')
	],
	darkMode: 'class',
	safelist: [
		// Primary colors (all supported theme colors)
		...['green', 'blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'indigo', 'cyan', 'teal', 'emerald', 'lime'].flatMap(color => [
			`text-${color}-50`, `text-${color}-100`, `text-${color}-200`, `text-${color}-300`, `text-${color}-400`, `text-${color}-500`, `text-${color}-600`, `text-${color}-700`, `text-${color}-800`, `text-${color}-900`,
			`bg-${color}-50`, `bg-${color}-100`, `bg-${color}-200`, `bg-${color}-300`, `bg-${color}-400`, `bg-${color}-500`, `bg-${color}-600`, `bg-${color}-700`, `bg-${color}-800`, `bg-${color}-900`,
			`border-${color}-50`, `border-${color}-100`, `border-${color}-200`, `border-${color}-300`, `border-${color}-400`, `border-${color}-500`, `border-${color}-600`, `border-${color}-700`, `border-${color}-800`, `border-${color}-900`,
			`hover:text-${color}-600`, `hover:text-${color}-400`, `hover:border-${color}-300`, `hover:border-${color}-700`,
			`dark:text-${color}-400`, `dark:text-${color}-300`, `dark:bg-${color}-900`, `dark:bg-${color}-800`, `dark:border-${color}-800`, `dark:border-${color}-700`,
			`dark:hover:text-${color}-400`, `dark:hover:border-${color}-700`,
			`from-${color}-600`, `via-${color}-500`, `to-${color}-600`, `dark:from-${color}-400`, `dark:via-${color}-400`, `dark:to-${color}-400`,
		]),
	],
}

