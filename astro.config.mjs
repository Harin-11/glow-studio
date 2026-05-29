import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// Update this URL when deploying to production
const SITE = "https://glowstudio.pe";

export default defineConfig({
	site: SITE,
	integrations: [react(), tailwind(), sitemap()],
});
