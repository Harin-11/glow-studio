/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				glow: {
					cream: "#F4EEE4",
					parchment: "#EDE5D6",
					mist: "#FAF7F2",
					charcoal: "#1E1B18",
					bark: "#3D3530",
					dusk: "#7A7068",
					gold: "#805E3B",
					"gold-light": "#8D6B45",
					"gold-soft": "#A8845A",
					sage: "#7B9176",
					"sage-mist": "#D4DDD2",
				},
			},
			fontFamily: {
				display: ['"Cormorant Garamond"', "serif"],
				heading: ['"Cormorant SC"', "serif"],
				body: ['"DM Sans"', "sans-serif"],
				mono: ['"DM Mono"', "monospace"],
			},
			maxWidth: {
				container: "1400px",
			},
			spacing: {
				header: "100px",
				"header-mobile": "70px",
			},
			animation: {
				"pulse-glow": "pulseGlow 2s ease-in-out infinite",
			},
			keyframes: {
				pulseGlow: {
					"0%, 100%": { opacity: "0.5", transform: "scale(1)" },
					"50%": { opacity: "1", transform: "scale(1.1)" },
				},
			},
		},
	},
	plugins: [],
};
