// Glow Studio — Shared Constants
// Update these values when contact info changes, not 20 files.

export const WHATSAPP_NUMBER = "51999999999";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const WHATSAPP_MESSAGE = (text) =>
	`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;

export const SITE_NAME = "Glow Studio";
export const SITE_DESCRIPTION =
	"Tratamientos de cuidado de piel y bienestar en Arequipa. Ritual Facial, Escultura de Cejas, Manicure Atelier y más.";

export const SOCIAL = {
	instagram: "https://instagram.com/glowstudio.aqp",
	facebook: "https://facebook.com/glowstudio.aqp",
	tiktok: "https://tiktok.com/@glowstudio.aqp",
	whatsapp: WHATSAPP_URL,
	email: "hola@glowstudio.pe",
};
