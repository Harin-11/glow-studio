import { useState, useCallback } from "react";
import MetodoAccordion from "./MetodoAccordion.jsx";
import MetodoCanvas from "./MetodoCanvas.jsx";

export default function MetodoContainer() {
	const [activeIndex, setActiveIndex] = useState(0);

	const handleOrbClick = useCallback((index) => {
		setActiveIndex(index);
		// Trigger accordion header click to sync
		const accordionHeaders = document.querySelectorAll(".accordion-header");
		if (accordionHeaders[index]) {
			accordionHeaders[index].click();
		}
	}, []);

	const handleAccordionChange = useCallback((index) => {
		setActiveIndex(index);
	}, []);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
			{/* Accordion first on mobile (order-1), left on desktop (lg:order-1) */}
			<div className="reveal order-1">
				<div className="label mb-4 text-glow-dusk">El Método Glow</div>
				<h2 className="font-heading font-medium text-3xl md:text-4xl lg:text-5xl mb-8">
					Por qué cada decisión cuenta
				</h2>
				<MetodoAccordion
					activeIndex={activeIndex}
					onAccordionChange={handleAccordionChange}
				/>
			</div>
			{/* Orbs second on mobile (order-2), right on desktop (lg:order-2) */}
			<div className="reveal order-2 h-full flex items-center justify-center">
				<MetodoCanvas activeIndex={activeIndex} onOrbClick={handleOrbClick} />
			</div>
		</div>
	);
}
