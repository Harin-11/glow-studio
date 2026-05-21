const items = [
	{
		title: "Escuchamos antes de tocar",
		content:
			"Cada visita comienza con una consulta de 10 minutos. Tu piel tiene historia; nosotros la leemos.",
	},
	{
		title: "Sin agresión, sin promesas vacías",
		content:
			"Solo tratamientos no invasivos con resultados verificables. Sin dolor, sin tiempo de recuperación.",
	},
	{
		title: "El ritual continúa en casa",
		content:
			"Te enseñamos a mantener los resultados con una rutina simple pensada para tu tipo de piel.",
	},
];

const iconPaths = {
	ear: "M12 2a3 3 0 0 0-3 3v2.5a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z M18.5 7.5A7.5 7.5 0 0 1 12 17M12 17a7.5 7.5 0 0 1-6.5-9.5M12 17v4M8 21h8",
	heart:
		"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
	home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
};

const stepNums = ["01", "02", "03"];

export default function MetodoAccordion({
	activeIndex = 0,
	onAccordionChange,
}) {
	const toggle = (i) => {
		const newIndex = activeIndex === i ? null : i;
		if (onAccordionChange && newIndex !== null) {
			onAccordionChange(i);
		}
	};

	return (
		<div className="accordion space-y-3">
			{items.map((item, i) => {
				const isOpen = activeIndex === i;
				return (
					<div
						key={i}
						className={`accordion-item rounded-lg transition-all duration-400 ease-out ${
							isOpen
								? "bg-gradient-to-r from-glow-gold/[0.07] to-transparent border-l-2 border-glow-gold shadow-sm"
								: "bg-transparent border-l-2 border-transparent hover:border-glow-gold/20"
						}`}
					>
						<button
							onClick={() => toggle(i)}
							className={`accordion-header w-full flex items-center gap-4 py-4 md:py-5 px-5 text-left cursor-pointer bg-transparent border-none transition-all duration-300 ${
								isOpen ? "" : "hover:bg-glow-gold/[0.02]"
							}`}
						>
							{/* Step number */}
							<span
								className={`font-mono text-[0.7rem] tracking-wider transition-all duration-300 shrink-0 ${
									isOpen ? "text-glow-gold" : "text-glow-dusk/40"
								}`}
							>
								{stepNums[i]}
							</span>

							{/* Icon */}
							<span
								className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-400 ease-out ${
									isOpen
										? "bg-glow-gold text-white shadow-lg shadow-glow-gold/20"
										: "bg-glow-gold/10 text-glow-gold"
								}`}
							>
								<svg
									className="w-4 h-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d={Object.values(iconPaths)[i]} />
								</svg>
							</span>

							{/* Title */}
							<h3
								className={`flex-1 font-body text-[0.95rem] md:text-[1.1rem] lg:text-[1.2rem] transition-all duration-300 ${
									isOpen
										? "font-medium text-glow-gold"
										: "font-normal text-glow-charcoal"
								}`}
							>
								{item.title}
							</h3>

							{/* Toggle indicator */}
							<span
								className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-400 ease-out ${
									isOpen
										? "border-glow-gold bg-glow-gold/10 rotate-45"
										: "border-glow-gold/30 rotate-0"
								}`}
							>
								<svg
									className={`w-3.5 h-3.5 transition-colors duration-300 ${
										isOpen ? "text-glow-gold" : "text-glow-dusk/60"
									}`}
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path d="M12 5v14M5 12h14" />
								</svg>
							</span>
						</button>

						<div
							className={`accordion-content-grid transition-all duration-400 ease-out ${
								isOpen ? "open" : ""
							}`}
						>
							<div>
								<div className="px-5 pb-5 pl-[5.5rem]">
									<p className="text-glow-bark font-body font-light text-[0.9rem] md:text-[0.95rem] leading-relaxed">
										{item.content}
									</p>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
