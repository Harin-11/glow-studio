import { useEffect } from "react";

export default function CursorEffects() {
	useEffect(() => {
		const cursor = document.getElementById("cursor");
		const cursorRing = document.getElementById("cursor-ring");
		if (!cursor || !cursorRing) return;

		let mouseX = 0,
			mouseY = 0;
		let ringX = 0,
			ringY = 0;

		const onMouseMove = (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			cursor.style.left = `${mouseX}px`;
			cursor.style.top = `${mouseY}px`;
		};

		function animate() {
			ringX += (mouseX - ringX) * 0.1;
			ringY += (mouseY - ringY) * 0.1;
			cursorRing.style.left = `${ringX}px`;
			cursorRing.style.top = `${ringY}px`;
			requestAnimationFrame(animate);
		}

		document.addEventListener("mousemove", onMouseMove);
		const raf = requestAnimationFrame(animate);

		// Hover states
		const interactives = document.querySelectorAll(
			"a, button, .accordion-header, .method-label-orb, .ritual-card",
		);
		const addHover = () => cursor.classList.add("hover");
		const removeHover = () => cursor.classList.remove("hover");

		interactives.forEach((el) => {
			el.addEventListener("mouseenter", addHover);
			el.addEventListener("mouseleave", removeHover);
		});

		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			cancelAnimationFrame(raf);
			interactives.forEach((el) => {
				el.removeEventListener("mouseenter", addHover);
				el.removeEventListener("mouseleave", removeHover);
			});
		};
	}, []);

	return (
		<>
			<div
				id="cursor"
				className="fixed w-6 h-6 bg-glow-gold rounded-full pointer-events-none z-[10000] translate-x-[-50%] translate-y-[-50%] transition-all duration-300"
				style={{ opacity: 0.8 }}
			/>
			<div
				id="cursor-ring"
				className="fixed w-[70px] h-[70px] border-2 border-glow-gold rounded-full pointer-events-none z-[9999] translate-x-[-50%] translate-y-[-50%] transition-all duration-500"
				style={{ opacity: 0.2 }}
			/>
			<div
				id="cursor-label"
				className="fixed pointer-events-none z-[10001] font-mono text-[9px] text-glow-charcoal uppercase translate-x-[-50%] translate-y-[calc(-50%+25px)] opacity-0 transition-opacity duration-300"
			/>
		</>
	);
}
