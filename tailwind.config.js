/** @type {import('tailwindcss').Config} */
// Transitional: only the pages not yet migrated to Once UI use Tailwind utilities.
export default {
	content: [
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				display: ['var(--font-heading)', 'Georgia', 'serif'],
			},
		},
	},
}
