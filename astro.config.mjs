import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// Usar el dominio de producción configurado en Vercel, o el dominio alpha por defecto
const SITE = process.env.VERCEL_PROJECT_PRODUCTION_URL
	? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
	: "https://glow-studio-alpha.vercel.app";

export default defineConfig({
	site: SITE,
	integrations: [react(), tailwind(), sitemap()],
	compressHTML: true,
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "hover",
	},
});
