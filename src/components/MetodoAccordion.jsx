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

const icons = [
  {
    path: "M12 2a3 3 0 0 0-3 3v2.5a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z M18.5 7.5A7.5 7.5 0 0 1 12 17M12 17a7.5 7.5 0 0 1-6.5-9.5M12 17v4M8 21h8",
    decor: "M4 17.5c4-2 8-2 16 0",
  },
  {
    path: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
    decor: "M9 12h6M12 9v6",
  },
  {
    path: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
    decor: "M12 2l-3 4h6l-3-4z",
  },
];

const stepNums = ["01", "02", "03"];

export default function MetodoAccordion({ activeIndex = 0, onAccordionChange }) {
  const toggle = (i) => {
    const newIndex = activeIndex === i ? null : i;
    if (onAccordionChange && newIndex !== null) onAccordionChange(i);
  };

  return (
    <div className="accordion space-y-4">
      {items.map((item, i) => {
        const isOpen = activeIndex === i;
        return (
          <div
            key={i}
            className={`accordion-item relative rounded-xl transition-all duration-500 ease-out overflow-hidden ${
              isOpen
                ? "bg-gradient-to-br from-glow-gold/[0.08] via-glow-gold/[0.03] to-transparent border border-glow-gold/20 shadow-[0_0_30px_-5px_rgba(168,132,90,0.15)]"
                : "bg-white/40 border border-transparent hover:border-glow-gold/10 hover:shadow-sm"
            }`}
          >
            {/* Decorative top line when active */}
            <div
              className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-glow-gold to-glow-gold-light transition-all duration-700 ease-out ${
                isOpen ? "w-full" : "w-0"
              }`}
            />

            <button
              onClick={() => toggle(i)}
              className={`accordion-header relative w-full flex items-center gap-4 py-5 md:py-6 px-5 md:px-6 text-left cursor-pointer bg-transparent border-none transition-all duration-300 ${
                isOpen ? "" : "hover:bg-glow-gold/[0.02]"
              }`}
            >
              {/* Icon in circular container */}
              <span
                className={`relative w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ease-out ${
                  isOpen
                    ? "bg-glow-gold text-white shadow-lg shadow-glow-gold/30 scale-110 rounded-xl"
                    : "bg-glow-gold/8 text-glow-gold rounded-2xl"
                }`}
              >
                <svg
                  className="w-[18px] h-[18px] md:w-5 md:h-5 relative z-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={icons[i].path} />
                </svg>
                {/* Decorative dot */}
                <span
                  className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full transition-all duration-500 ${
                    isOpen
                      ? "bg-glow-gold-light opacity-100"
                      : "bg-transparent opacity-0"
                  }`}
                />
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className={`font-mono text-[0.6rem] md:text-[0.65rem] tracking-[0.15em] transition-all duration-300 ${
                      isOpen ? "text-glow-gold/70" : "text-glow-dusk/30"
                    }`}
                  >
                    {stepNums[i]}
                  </span>
                  {/* Separator dot */}
                  <span className={`w-0.5 h-0.5 rounded-full transition-all duration-300 ${
                    isOpen ? "bg-glow-gold/40" : "bg-glow-dusk/20"
                  }`} />
                  <span className="font-body text-[0.65rem] md:text-[0.7rem] text-glow-dusk/40 italic">
                    {["Paso inicial", "El proceso", "El resultado"][i]}
                  </span>
                </div>
                <h3
                  className={`font-body text-[0.95rem] md:text-[1.1rem] lg:text-[1.2rem] transition-all duration-300 ${
                    isOpen
                      ? "font-medium text-glow-gold"
                      : "font-normal text-glow-charcoal"
                  }`}
                >
                  {item.title}
                </h3>
              </div>

              {/* Toggle indicator with ring */}
              <span
                className={`relative w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ease-out ${
                  isOpen
                    ? "bg-glow-gold/10 border border-glow-gold/30 rotate-45"
                    : "bg-transparent border border-glow-gold/20 rotate-0 group-hover:border-glow-gold/40"
                }`}
              >
                <svg
                  className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-all duration-300 ${
                    isOpen ? "text-glow-gold" : "text-glow-dusk/50"
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

            {/* Content area */}
            <div
              className={`accordion-content-grid transition-all duration-500 ease-out ${
                isOpen ? "open" : ""
              }`}
            >
              <div>
                <div className="px-5 md:px-6 pb-6 md:pb-7 pl-[4.5rem] md:pl-[5.2rem]">
                  <div className="relative">
                    {/* Decorative quote mark */}
                    <span className="absolute -left-3 top-0 text-glow-gold/10 font-display text-[2rem] leading-none -translate-x-full">
                      &ldquo;
                    </span>
                    <p className="text-glow-bark/90 font-body font-light text-[0.9rem] md:text-[0.95rem] leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                  {/* Subtle bottom line */}
                  <div className="mt-3 h-px bg-gradient-to-r from-glow-gold/15 via-glow-gold/5 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
