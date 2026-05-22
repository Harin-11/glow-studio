import { useState } from "react";
import {
	ArrowRight,
	MessageCircle,
	Instagram,
	ChevronRight,
} from "lucide-react";

/* ==========================================
   Animated Arrow Icon
   ========================================== */
function AnimatedArrow({ className = "w-4 h-4" }) {
	const [hovered, setHovered] = useState(false);
	return (
		<span
			className="btn-arrow"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<ArrowRight
				className={`${className} transition-transform duration-300 ${hovered ? "translate-x-1" : "translate-x-0"}`}
				strokeWidth={2.5}
			/>
		</span>
	);
}

/* ==========================================
   Glow Button — primary (gold)
   ========================================== */
export function GlowButton({
	children,
	href = "#",
	size = "lg",
	icon = "arrow", // 'arrow' | 'message' | 'instagram'
	className = "",
	...props
}) {
	const sizeClass = {
		sm: "btn-glow btn-glow-sm",
		md: "btn-glow btn-glow-md",
		lg: "btn-glow btn-glow-lg",
	}[size] || "btn-glow btn-glow-lg";

	const iconMap = {
		arrow: <ArrowRight className="w-4 h-4" strokeWidth={2.5} />,
		message: <MessageCircle className="w-4 h-4" strokeWidth={2} />,
		instagram: <Instagram className="w-4 h-4" strokeWidth={2} />,
		chevron: <ChevronRight className="w-4 h-4" strokeWidth={2.5} />,
	};

	return (
		<a href={href} className={`${sizeClass} ${className}`} {...props}>
			{children}
			{icon && (
				<span className="btn-arrow">
					{iconMap[icon]}
				</span>
			)}
		</a>
	);
}

/* ==========================================
   Outline Button — border variant
   ========================================== */
export function OutlineButton({
	children,
	href = "#",
	size = "lg",
	icon = "arrow",
	className = "",
	...props
}) {
	const sizeClass = {
		sm: "btn-outline btn-glow-sm",
		md: "btn-outline btn-glow-md",
		lg: "btn-outline btn-glow-lg",
	}[size] || "btn-outline btn-glow-lg";

	const iconMap = {
		arrow: <ArrowRight className="w-4 h-4" strokeWidth={2.5} />,
		message: <MessageCircle className="w-4 h-4" strokeWidth={2} />,
		instagram: <Instagram className="w-4 h-4" strokeWidth={2} />,
		chevron: <ChevronRight className="w-4 h-4" strokeWidth={2.5} />,
	};

	return (
		<a href={href} className={`${sizeClass} ${className}`} {...props}>
			{children}
			{icon && (
				<span className="btn-arrow">
					{iconMap[icon]}
				</span>
			)}
		</a>
	);
}

/* ==========================================
   Nav Arrow (header close/open)
   ========================================== */
export function NavArrow({ className = "w-3 h-3" }) {
	return (
		<span className="btn-arrow">
			<ChevronRight className={className} strokeWidth={2.5} />
		</span>
	);
}