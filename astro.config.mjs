import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// Usar el dominio de preview en Vercel para pruebas y el dominio final en producción
const SITE = process.env.VERCEL_ENV === "production"
	? "https://glowstudio.pe"
	: (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://glowstudio.pe");

export default defineConfig({
	site: SITE,
	integrations: [react(), tailwind(), sitemap()],
});
