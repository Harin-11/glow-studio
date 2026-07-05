const items = [
	{
		title: "Escuchamos antes de tocar",
		sublabel: "Paso inicial",
		content:
			"Cada visita comienza con una consulta de 10 minutos. Tu piel tiene historia; nosotros la leemos.",
	},
	{
		title: "Sin agresión, sin promesas vacías",
		sublabel: "El proceso",
		content:
			"Solo tratamientos no invasivos con resultados verificables. Sin dolor, sin tiempo de recuperación.",
	},
	{
		title: "El ritual continúa en casa",
		sublabel: "El resultado",
		content:
			"Te enseñamos a mantener los resultados con una rutina simple pensada para tu tipo de piel.",
	},
];

const icons = [
	{
		path: "M12 2a3 3 0 0 0-3 3v2.5a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z M18.5 7.5A7.5 7.5 0 0 1 12 17M12 17a7.5 7.5 0 0 1-6.5-9.5M12 17v4M8 21h8",
	},
	{
		path: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
	},
	{
		path: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
	},
];

const stepNums = ["01", "02", "03"];

export default function MetodoAccordion({
	activeIndex = 0,
	onAccordionChange,
}) {
	const toggle = (i) => {
		const newIndex = activeIndex === i ? null : i;
		if (onAccordionChange && newIndex !== null) onAccordionChange(i);
	};

	return (
		<div className="accordion space-y-3">
			{items.map((item, i) => {
				const isOpen = activeIndex === i;
				return (
					<div
						key={i}
						className={`accordion-item relative rounded-2xl transition-all duration-500 ease-out overflow-hidden group
							${
								isOpen
									? "bg-white/70 border border-glow-gold/25 shadow-[0_0_40px_-8px_rgba(128,94,59,0.2)]"
									: "bg-white/30 border border-transparent hover:border-glow-gold/10 hover:shadow-[0_4px_20px_-6px_rgba(128,94,59,0.08)]"
							}`}
					>
						{/* Active glow border top */}
						<div
							className={`absolute top-0 left-0 right-0 h-[1.5px] transition-all duration-700 ease-out origin-left ${
								isOpen
									? "opacity-100 scale-x-100"
									: "opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-100"
							}`}
							style={{
								background:
									"linear-gradient(90deg, #805E3B 0%, #8D6B45 50%, #805E3B 100%)",
							}}
						/>

						{/* Active ambient glow behind card */}
						<div
							className={`absolute inset-0 transition-opacity duration-700 pointer-events-none rounded-2xl ${
								isOpen ? "opacity-100" : "opacity-0"
							}`}
							style={{
								background:
									"radial-gradient(ellipse 120% 80% at 50% 0%, rgba(128,94,59,0.06) 0%, transparent 70%)",
							}}
						/>

						<button
							onClick={() => toggle(i)}
							className={`accordion-header accordion-btn relative w-full flex items-center gap-4 py-5 md:py-6 px-5 md:px-6 text-left cursor-pointer bg-transparent border-none
								transition-all duration-400 ease-out
								${isOpen ? "" : "hover:pl-6"}`}
						>
							{/* Animated icon container */}
							<span
								className={`accordion-icon relative w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shrink-0
									transition-all duration-500 ease-out
									${
										isOpen
											? "bg-glow-gold text-white shadow-[0_0_20px_rgba(128,94,59,0.35)] scale-110"
											: "bg-glow-gold/6 text-glow-gold group-hover:bg-glow-gold/10 group-hover:scale-105"
									}`}
							>
								{/* Background pulse ring when active */}
								<span
									className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
										isOpen ? "opacity-100 animate-pulse-glow" : "opacity-0"
									}`}
									style={{ background: "rgba(128,94,59,0.15)" }}
								/>
								<svg
									className={`w-[18px] h-[18px] md:w-5 md:h-5 relative z-10 transition-transform duration-500 ease-out ${isOpen ? "scale-100" : "scale-90"}`}
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d={icons[i].path} />
								</svg>
								{/* Decorative corner dot */}
								<span
									className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full transition-all duration-500 ${
										isOpen
											? "bg-glow-gold-light opacity-100 scale-100"
											: "opacity-0 scale-0"
									}`}
									style={{ transitionDelay: isOpen ? "200ms" : "0ms" }}
								/>
							</span>

							{/* Content — text animations */}
							<div className="flex-1 min-w-0">
								{/* Meta row with animated underline */}
								<div className="flex items-center gap-2 mb-1">
									<span
										className={`accordion-step font-mono text-[0.6rem] md:text-[0.65rem] tracking-[0.15em] transition-all duration-400 ${
											isOpen
												? "text-glow-gold translate-x-0"
												: "text-glow-dusk/30 translate-x-0 group-hover:translate-x-0.5"
										}`}
									>
										{stepNums[i]}
									</span>
									<span
										className={`w-0.5 h-0.5 rounded-full transition-all duration-400 ${
											isOpen
												? "bg-glow-gold/50 scale-100"
												: "bg-glow-dusk/20 scale-75"
										}`}
									/>
									<span className="font-body text-[0.65rem] md:text-[0.7rem] text-glow-dusk/35 italic transition-colors duration-400">
										{item.sublabel}
									</span>
								</div>
								{/* Title with color + weight transition */}
								<h3
									className={`accordion-title font-body text-[0.95rem] md:text-[1.1rem] lg:text-[1.2rem]
										transition-all duration-400 ease-out
										${
											isOpen
												? "font-medium text-glow-gold translate-y-0"
												: "font-normal text-glow-charcoal group-hover:text-glow-bark"
										}`}
								>
									{item.title}
								</h3>
							</div>

							{/* Plus/Minus toggle with 3D rotation */}
							<span
								className={`accordion-toggle relative w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center shrink-0
									transition-all duration-500 ease-out
									${
										isOpen
											? "bg-glow-gold/12 border border-glow-gold/35 rotate-[135deg] shadow-[inset_0_0_8px_rgba(128,94,59,0.15)]"
											: "bg-transparent border border-glow-gold/20 rotate-0 group-hover:border-glow-gold/40 group-hover:bg-glow-gold/5"
									}`}
							>
								<svg
									className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-all duration-400 ease-out ${
										isOpen
											? "text-glow-gold"
											: "text-glow-dusk/40 group-hover:text-glow-dusk/70"
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

						{/* Expandable content */}
						<div
							className={`accordion-content-grid transition-all duration-500 ease-out ${
								isOpen ? "open" : ""
							}`}
						>
							<div>
								<div className="px-5 md:px-6 pb-6 md:pb-7 pl-[4.5rem] md:pl-[5.2rem]">
									{/* Animated quote */}
									<div className="relative">
										<span
											className={`accordion-quote absolute -left-2 top-0 text-glow-gold/15 font-display text-[2rem] leading-none -translate-x-full transition-all duration-500 ${
												isOpen
													? "opacity-100 -translate-x-full"
													: "opacity-0 -translate-x-full"
											}`}
											style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}
										>
											&ldquo;
										</span>
										<p
											className={`accordion-text text-glow-bark/80 font-body font-light text-[0.9rem] md:text-[0.95rem] leading-relaxed transition-all duration-500 ${
												isOpen
													? "opacity-100 translate-y-0"
													: "opacity-0 translate-y-2"
											}`}
											style={{ transitionDelay: isOpen ? "150ms" : "0ms" }}
										>
											{item.content}
										</p>
									</div>
									{/* Animated bottom separator */}
									<div
										className={`mt-4 h-px transition-all duration-500 ${
											isOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
										}`}
										style={{
											background:
												"linear-gradient(90deg, transparent 0%, rgba(168,132,90,0.2) 30%, rgba(168,132,90,0.1) 70%, transparent 100%)",
											transitionDelay: isOpen ? "200ms" : "0ms",
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
