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
				"fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				"slide-up": "slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				"door-open": "doorOpen 1.8s cubic-bezier(0.77, 0, 0.175, 1) forwards",
				"pulse-glow": "pulseGlow 2s ease-in-out infinite",
			},
			keyframes: {
				fadeIn: {
					to: { opacity: "1" },
				},
				slideUp: {
					to: {
						opacity: "1",
						transform: "translateY(0) scale(1)",
						filter: "blur(0)",
					},
				},
				doorOpen: {
					to: { transform: "translateX(-100%)" },
				},
				pulseGlow: {
					"0%, 100%": { opacity: "0.5", transform: "scale(1)" },
					"50%": { opacity: "1", transform: "scale(1.1)" },
				},
			},
		},
	},
	plugins: [],
};
