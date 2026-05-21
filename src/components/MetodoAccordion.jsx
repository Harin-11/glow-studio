import { useState } from "react";

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

export default function MetodoAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = activeIndex === i;
        return (
          <div
            key={i}
            className={`accordion-item border-b border-glow-gold/10 transition-colors duration-300 ${
              isOpen ? "bg-glow-gold/5" : ""
            }`}
          >
            <button
              onClick={() => toggle(i)}
              className="accordion-header w-full flex justify-between items-center py-4 md:py-6 px-4 md:px-6 text-left cursor-pointer bg-transparent border-none transition-colors duration-300 hover:bg-glow-gold/[0.02]"
            >
              <h3
                className={`font-body font-normal text-[0.95rem] md:text-[1.1rem] lg:text-[1.3rem] transition-all duration-300 ${
                  isOpen ? "font-medium text-glow-gold" : "text-glow-charcoal"
                }`}
              >
                {item.title}
              </h3>
              <span
                className={`font-mono text-[1.2rem] text-glow-gold transition-transform duration-300 ease-out ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              >
                +
              </span>
            </button>

            {/* CSS grid-rows animation: no Framer Motion needed */}
            <div
              className={`accordion-content-grid ${
                isOpen ? "open" : ""
              }`}
            >
              <div>
                <div className="px-4 md:px-6 pb-4 md:pb-6">
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
