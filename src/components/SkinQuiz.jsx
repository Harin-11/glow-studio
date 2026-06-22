import { useState } from "react";
import { WHATSAPP_NUMBER } from "../constants";

import facialImg from "../assets/facial.webp";
import heroImg from "../assets/hero.webp";
import massageImg from "../assets/massage.webp";

const questions = [
	{
		id: "goal",
		title: "¿Cuál es el principal objetivo para tu piel hoy?",
		subtitle: "Selecciona el aspecto en el que deseas enfocarte prioritariamente.",
		options: [
			{
				value: "luminosidad",
				label: "Revitalizar & Iluminar",
				desc: "Combatir la opacidad, el tono apagado y devolver el brillo natural.",
			},
			{
				value: "hidratacion",
				label: "Hidratar & Nutrir",
				desc: "Restaurar la humedad profunda, aliviar la tirantez y descamación.",
			},
			{
				value: "firmeza",
				label: "Firmeza & Definición",
				desc: "Tonificar el óvalo facial, suavizar líneas de expresión y redefinir contornos.",
			},
			{
				value: "calma",
				label: "Calmar & Equilibrar",
				desc: "Aliviar rojeces, sensibilidad o realizar una limpieza profunda descongestiva.",
			},
		],
	},
	{
		id: "type",
		title: "¿Cómo describirías la textura o sensación de tu piel?",
		subtitle: "Elige la descripción que mejor se adapte al comportamiento de tu rostro.",
		options: [
			{
				value: "seca",
				label: "Seca o Tirante",
				desc: "Poros casi imperceptibles, opacidad y sensación de falta de grasa.",
			},
			{
				value: "mixta",
				label: "Mixta o Grasa",
				desc: "Brillos en la zona T (frente, nariz, mentón) y poros más visibles.",
			},
			{
				value: "sensible",
				label: "Sensible o Reactiva",
				desc: "Se enrojece fácilmente con el roce, el clima o la aplicación de productos.",
			},
		],
	},
];

const treatments = {
	"firmeza-seca": {
		name: "Lifting Facial Sin Agujas",
		category: "Rostro",
		duration: "90 min",
		price: "S/. 220",
		img: facialImg.src,
		reason:
			"Recomendamos este ritual porque tu piel busca firmeza y tiende a la sequedad. La combinación de radiofrecuencia y masoterapia profunda aportará volumen, definirá tus rasgos y activará la producción interna de colágeno sin descuidar la hidratación.",
	},
	"firmeza-mixta": {
		name: "Lifting Facial Sin Agujas",
		category: "Rostro",
		duration: "90 min",
		price: "S/. 220",
		img: facialImg.src,
		reason:
			"Para una piel mixta que busca firmeza, este lifting activa la regeneración profunda a nivel celular, mejorando la densidad tisular mientras mantiene el balance de sebo mediante el masaje drenante.",
	},
	"firmeza-sensible": {
		name: "Lifting Facial Sin Agujas (Protocolo Suave)",
		category: "Rostro",
		duration: "90 min",
		price: "S/. 220",
		img: facialImg.src,
		reason:
			"Combinamos la radiofrecuencia adaptada a bajas temperaturas con masoterapia neurosensorial para tonificar los tejidos sin activar reactividad en tu piel sensible.",
	},
	"luminosidad-seca": {
		name: "Ritual Glow Instantáneo",
		category: "Rostro",
		duration: "50 min",
		price: "S/. 120",
		img: heroImg.src,
		reason:
			"Tu piel recuperará su luz gracias a la hidratación exprés del velo de colágeno marino y un masaje nutritivo con aceites botánicos ricos en vitaminas.",
	},
	"luminosidad-mixta": {
		name: "Ritual Glow Instantáneo",
		category: "Rostro",
		duration: "50 min",
		price: "S/. 120",
		img: heroImg.src,
		reason:
			"Para pieles mixtas, este ritual hidrata profundamente las zonas secas y aporta luminosidad uniforme sin dejar residuos grasos, equilibrando con esferas criogénicas frías.",
	},
	"luminosidad-sensible": {
		name: "Ritual Glow Instantáneo (Calmante)",
		category: "Rostro",
		duration: "50 min",
		price: "S/. 120",
		img: heroImg.src,
		reason:
			"Un shot de luz para pieles sensibles. Usamos sueros hidratantes a base de manzanilla y caléndula junto con el velo descongestivo para iluminar sin irritar.",
	},
	"hidratacion-seca": {
		name: "Ritual Facial Profundo (Nutrición)",
		category: "Rostro",
		duration: "75 min",
		price: "S/. 150",
		img: facialImg.src,
		reason:
			"Es la combinación ideal para restaurar la barrera de tu piel. La limpieza ultrasónica suave retira células muertas y el masaje de nutrición profunda devuelve los lípidos esenciales.",
	},
	"hidratacion-mixta": {
		name: "Ritual Facial Profundo (Equilibrante)",
		category: "Rostro",
		duration: "75 min",
		price: "S/. 150",
		img: facialImg.src,
		reason:
			"Un tratamiento completo que exfolia y extrae impurezas de la zona T, hidratando profundamente las mejillas con mascarillas de arcillas nobles purificantes.",
	},
	"hidratacion-sensible": {
		name: "Ritual Facial Profundo (Sensible)",
		category: "Rostro",
		duration: "75 min",
		price: "S/. 150",
		img: facialImg.src,
		reason:
			"Limpieza profunda sumamente respetuosa. Sin extracciones agresivas ni vapor caliente; en su lugar, aplicamos ozono frío y mascarillas calmantes de arcilla rosa.",
	},
	"calma-seca": {
		name: "Masaje Relajante Aromaterapia",
		category: "Cuerpo",
		duration: "60 min",
		price: "S/. 130",
		img: massageImg.src,
		reason:
			"Cuando el objetivo es la calma y tu piel es seca, un masaje corporal de aromaterapia con aceites calientes de lavanda nutre tu piel de pies a cabeza mientras aquieta tu mente.",
	},
	"calma-mixta": {
		name: "Ritual Facial Profundo (Equilibrante)",
		category: "Rostro",
		duration: "75 min",
		price: "S/. 150",
		img: facialImg.src,
		reason:
			"Para balancear la piel mixta que necesita calma, el facial profundo limpia toxinas y descongestiona los poros, brindando frescura y alivio inmediato.",
	},
	"calma-sensible": {
		name: "Ritual Facial Profundo (Sensible)",
		category: "Rostro",
		duration: "75 min",
		price: "S/. 150",
		img: facialImg.src,
		reason:
			"Diseñado para calmar la sensibilidad extrema. Reducimos la inflamación y reforzamos la barrera cutánea con activos prebióticos y arcilla rosa reconfortante.",
	},
};

export default function SkinQuiz() {
	const [step, setStep] = useState(0);
	const [answers, setAnswers] = useState({});

	const handleOptionSelect = (questionId, value) => {
		const updatedAnswers = { ...answers, [questionId]: value };
		setAnswers(updatedAnswers);

		if (step < questions.length - 1) {
			setStep(step + 1);
		} else {
			setStep(step + 1); // Go to results
		}
	};

	const resetQuiz = () => {
		setStep(0);
		setAnswers({});
	};

	const getRecommendation = () => {
		const key = `${answers.goal}-${answers.type}`;
		return (
			treatments[key] || {
				name: "Ritual Facial Profundo",
				category: "Rostro",
				duration: "75 min",
				price: "S/. 150",
				img: facialImg.src,
				reason:
					"Basado en tus respuestas, sugerimos nuestro facial profundo estrella para limpiar, purificar y sentar las bases de salud en tu piel.",
			}
		);
	};

	const whatsappUrl = (text) =>
		`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

	const currentQuestion = questions[step];

	return (
		<div className="max-w-3xl mx-auto bg-glow-cream border border-glow-gold/15 rounded-sm p-6 md:p-10 shadow-sm relative overflow-hidden">
			{/* Decorative grid lines */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#A8845A04_1px,transparent_1px),linear-gradient(to_bottom,#A8845A04_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

			<div className="relative z-10">
				{step < questions.length ? (
					<div>
						{/* Progress Bar */}
						<div className="flex justify-between items-center mb-8">
							<span className="font-mono text-[0.7rem] text-glow-gold uppercase tracking-widest">
								Paso {step + 1} de {questions.length}
							</span>
							<div className="flex gap-1.5">
								{questions.map((_, i) => (
									<div
										key={i}
										className={`h-1.5 rounded-full transition-all duration-500 ${
											i === step ? "w-8 bg-glow-gold" : "w-2 bg-glow-gold/25"
										}`}
									/>
								))}
							</div>
						</div>

						{/* Question Header */}
						<h2 className="font-heading font-medium text-2xl md:text-3xl text-glow-charcoal mb-2 leading-tight">
							{currentQuestion.title}
						</h2>
						<p className="font-body font-light text-[0.88rem] text-glow-bark/80 mb-8">
							{currentQuestion.subtitle}
						</p>

						{/* Options Grid */}
						<div className="grid grid-cols-1 gap-4">
							{currentQuestion.options.map((opt) => (
								<button
									key={opt.value}
									onClick={() => handleOptionSelect(currentQuestion.id, opt.value)}
									className="group text-left p-5 border border-glow-gold/20 hover:border-glow-gold bg-glow-mist/30 hover:bg-glow-mist rounded-sm transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-glow-gold/45"
								>
									<div className="flex justify-between items-center mb-1.5">
										<span className="font-heading font-medium text-lg text-glow-charcoal group-hover:text-glow-gold transition-colors">
											{opt.label}
										</span>
										<span className="w-5 h-5 rounded-full border border-glow-gold/30 flex items-center justify-center group-hover:border-glow-gold transition-colors">
											<span className="w-2.5 h-2.5 rounded-full bg-glow-gold scale-0 group-hover:scale-100 transition-transform duration-300" />
										</span>
									</div>
									<p className="font-body font-light text-[0.82rem] text-glow-bark/75 leading-relaxed">
										{opt.desc}
									</p>
								</button>
							))}
						</div>
					</div>
				) : (
					/* Results Screen */
					(() => {
						const rec = getRecommendation();
						const whatsappText = `Hola Glow Studio, he realizado el cuestionario de diagnóstico virtual y me recomendó el ritual "${rec.name}". Quisiera agendar una cita para evaluar mi piel por favor.`;
						return (
							<div className="text-center reveal visible">
								<div className="w-12 h-12 rounded-full border border-glow-gold/30 flex items-center justify-center mx-auto mb-6 text-glow-gold">
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<span className="label text-glow-gold text-[0.7rem] block mb-2">
									Diagnóstico Completado
								</span>
								<h2 className="font-display italic font-light text-3xl md:text-4xl text-glow-charcoal mb-8">
									Tu ritual recomendado
								</h2>

								{/* Recommendation Details Card */}
								<div className="grid grid-cols-1 md:grid-cols-12 border border-glow-gold/15 bg-glow-mist/40 rounded-sm overflow-hidden text-left mb-10 shadow-sm">
									<div className="md:col-span-4 bg-glow-parchment aspect-[4/3] md:aspect-auto">
										<img
											src={rec.img}
											alt={rec.name}
											className="w-full h-full object-cover grayscale-[10%] sepia-[5%]"
										/>
									</div>
									<div className="md:col-span-8 p-6 md:p-8 flex flex-col justify-between">
										<div>
											<div className="flex justify-between items-start gap-4 mb-2">
												<span className="label text-glow-gold text-[0.62rem]">
													{rec.category}
												</span>
												<span className="font-mono text-[0.8rem] text-glow-gold font-medium">
													{rec.price}
												</span>
											</div>
											<h3 className="font-heading font-medium text-xl text-glow-charcoal mb-4">
												{rec.name}
											</h3>
											<p className="font-body font-light text-[0.85rem] leading-relaxed text-glow-bark/85 mb-4">
												{rec.reason}
											</p>
										</div>
										<div className="flex items-center gap-4 text-glow-dusk text-[0.72rem] font-mono border-t border-glow-gold/10 pt-4">
											<span>Duración: {rec.duration}</span>
											<span>•</span>
											<span>Cabina Privada</span>
										</div>
									</div>
								</div>

								{/* Actions */}
								<div className="flex flex-col sm:flex-row justify-center items-center gap-4">
									<a
										href={whatsappUrl(whatsappText)}
										target="_blank"
										rel="noopener noreferrer"
										className="btn-glow btn-glow-md w-full sm:w-auto text-center justify-center"
									>
										<svg
											className="w-4 h-4"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
										</svg>
										Agendar este Ritual
									</a>
									<button
										onClick={resetQuiz}
										className="inline-flex items-center gap-3 bg-glow-gold/10 hover:bg-glow-gold/20 border border-glow-gold/20 text-glow-gold font-medium rounded-full px-7 py-3.5 text-[0.87rem] transition-all duration-300 ease-out active:scale-[0.96] justify-center w-full sm:w-auto cursor-pointer focus:outline-none"
									>
										Realizar test de nuevo
									</button>
								</div>
							</div>
						);
					})()
				)}
			</div>
		</div>
	);
}
