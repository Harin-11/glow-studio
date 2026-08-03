import { useEffect, useRef } from "react";

export default function MetodoCanvas({ activeIndex = 0, onOrbClick }) {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);
	const activeRef = useRef(activeIndex);
	const renderFrameRef = useRef(null);

	// Keep ref in sync without restarting canvas
	useEffect(() => {
		activeRef.current = activeIndex;
		renderFrameRef.current?.();
	}, [activeIndex]);

	// Canvas animation — runs once, never restarts
	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext("2d");
		let width,
			height,
			blobs = [];
		let animationId = null;
		let flowPhase = 0;
		const supportsIntersectionObserver = "IntersectionObserver" in window;
		let isIntersecting = !supportsIntersectionObserver;
		let isDocumentVisible = document.visibilityState !== "hidden";
		let reducedMotion = false;
		let cachedPositions = [];
		let cachedGradient = null;
		let cachedGradientKey = "";
		let lastActiveIndex = activeRef.current;

		const resize = () => {
			if (!canvas) return;
			const rect = container.getBoundingClientRect();
			width = canvas.width = rect.width;
			height = canvas.height = rect.height;
		};

		resize();

		const size = () => Math.min(width, height);

		class Blob {
			constructor() {
				this.reset();
			}
			reset() {
				const s = size();
				this.x = Math.random() * width;
				this.y = Math.random() * height;
				this.r = Math.random() * (s * 0.1) + s * 0.05;
				this.vx = (Math.random() - 0.5) * 1.2;
				this.vy = (Math.random() - 0.5) * 1.2;
				this.color = "rgba(128, 94, 59, 0.4)";
			}
			update() {
				this.x += this.vx;
				this.y += this.vy;
				if (this.x < 0 || this.x > width) this.vx *= -1;
				if (this.y < 0 || this.y > height) this.vy *= -1;
			}
			draw() {
				ctx.fillStyle = this.color;
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		const s = size();
		const blobCount = Math.max(4, Math.floor(s / 50));
		for (let i = 0; i < blobCount; i++) blobs.push(new Blob());

		const orbElements = Array.from(
			container.querySelectorAll(".method-label-orb"),
		);

		const getOrbPositions = () => {
			const containerRect = container.getBoundingClientRect();
			return orbElements.map((orb) => {
				const r = orb.getBoundingClientRect();
				return {
					x: r.left + r.width / 2 - containerRect.left,
					y: r.top + r.height / 2 - containerRect.top,
				};
			});
		};

		const invalidateGradient = () => {
			cachedGradient = null;
			cachedGradientKey = "";
		};

		const updateCachedPositions = () => {
			cachedPositions = getOrbPositions();
			invalidateGradient();
		};

		const getGradient = (positions) => {
			if (positions.length < 3) return null;

			const currentActive = activeRef.current;
			const active = positions[currentActive] || positions[0];
			const gradientKey = [
				currentActive,
				width,
				height,
				active.x,
				active.y,
				size(),
			].join(":");

			if (cachedGradient && cachedGradientKey === gradientKey) {
				return cachedGradient;
			}

			const gradient = ctx.createRadialGradient(
				active.x,
				active.y,
				0,
				active.x,
				active.y,
				size() * 0.6,
			);
			gradient.addColorStop(0, "rgba(128, 94, 59, 0.2)");
			gradient.addColorStop(0.4, "rgba(128, 94, 59, 0.08)");
			gradient.addColorStop(1, "rgba(128, 94, 59, 0)");
			cachedGradient = gradient;
			cachedGradientKey = gradientKey;

			return gradient;
		};

		const drawFluidConnection = (positions) => {
			if (positions.length < 3) return;
			const [p0, p1, p2] = positions;
			flowPhase += 0.02;

			ctx.save();
			ctx.beginPath();
			ctx.moveTo(p0.x, p0.y);

			const mx1 = (p0.x + p1.x) / 2,
				my1 = (p0.y + p1.y) / 2;
			const curve1 = size() * 0.08 * Math.sin(flowPhase);
			ctx.quadraticCurveTo(
				mx1 + (p1.y - p0.y) * 0.3 + curve1,
				my1 - (p1.x - p0.x) * 0.3,
				p1.x,
				p1.y,
			);

			const mx2 = (p1.x + p2.x) / 2,
				my2 = (p1.y + p2.y) / 2;
			const curve2 = size() * 0.08 * Math.cos(flowPhase * 0.7);
			ctx.quadraticCurveTo(
				mx2 + (p2.y - p1.y) * 0.3 + curve2,
				my2 - (p2.x - p1.x) * 0.3,
				p2.x,
				p2.y,
			);

			const mx3 = (p2.x + p0.x) / 2,
				my3 = (p2.y + p0.y) / 2;
			ctx.quadraticCurveTo(
				mx3 + (p0.y - p2.y) * 0.3,
				my3 - (p0.x - p2.x) * 0.3 + size() * 0.06 * Math.sin(flowPhase * 0.5),
				p0.x,
				p0.y,
			);
			ctx.closePath();

			ctx.fillStyle = getGradient(positions);
			ctx.fill();
			ctx.strokeStyle = "rgba(128, 94, 59, 0.08)";
			ctx.lineWidth = Math.max(6, size() * 0.03);
			ctx.stroke();
			ctx.restore();
		};

		const drawFrame = (advanceAnimation = true) => {
			const currentActive = activeRef.current;
			if (currentActive !== lastActiveIndex) {
				updateCachedPositions();
				lastActiveIndex = currentActive;
			}

			ctx.clearRect(0, 0, width, height);
			if (cachedPositions.length === 0) updateCachedPositions();
			drawFluidConnection(cachedPositions);
			blobs.forEach((b) => {
				if (advanceAnimation) b.update();
				b.draw();
			});

			// Sync orb float — reads active state from DOM rather than React
			const time = advanceAnimation ? Date.now() * 0.001 : 0;
			orbElements.forEach((orb, i) => {
				const ox = Math.sin(time + i * 1.2) * 6;
				const oy = Math.cos(time * 0.8 + i * 1.2) * 5;
				orb.style.setProperty("--float-x", `${ox}px`);
				orb.style.setProperty("--float-y", `${oy}px`);
			});

		};

		const canAnimate = () =>
			!reducedMotion && isIntersecting && isDocumentVisible;

		const stopAnimation = () => {
			if (animationId !== null) {
				cancelAnimationFrame(animationId);
				animationId = null;
			}
		};

		const animate = () => {
			animationId = null;
			if (!canAnimate()) return;

			drawFrame();
			animationId = requestAnimationFrame(animate);
		};

		const startAnimation = () => {
			if (canAnimate() && animationId === null) animate();
		};

		const renderStaticFrame = () => {
			if (reducedMotion) drawFrame(false);
		};
		renderFrameRef.current = renderStaticFrame;

		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const handleMotionPreferenceChange = (event) => {
			reducedMotion = event.matches;
			stopAnimation();
			if (reducedMotion) renderStaticFrame();
			else startAnimation();
		};
		reducedMotion = mediaQuery.matches;

		const intersectionObserver =
			supportsIntersectionObserver
				? new IntersectionObserver(([entry]) => {
						isIntersecting = entry.isIntersecting;
						if (isIntersecting) {
							if (reducedMotion) renderStaticFrame();
							else startAnimation();
						} else {
							stopAnimation();
						}
					})
				: null;
		intersectionObserver?.observe(container);

		const handleVisibilityChange = () => {
			isDocumentVisible = document.visibilityState !== "hidden";
			if (isDocumentVisible) {
				if (reducedMotion) renderStaticFrame();
				else startAnimation();
			} else {
				stopAnimation();
			}
		};

		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener("change", handleMotionPreferenceChange);
		} else {
			mediaQuery.addListener(handleMotionPreferenceChange);
		}
		document.addEventListener("visibilitychange", handleVisibilityChange);
		if (reducedMotion) renderStaticFrame();
		else startAnimation();

		const handleResize = () => {
			resize();
			updateCachedPositions();
			if (reducedMotion) renderStaticFrame();
		};
		window.addEventListener("resize", handleResize);

		return () => {
			stopAnimation();
			renderFrameRef.current = null;
			intersectionObserver?.disconnect();
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			if (mediaQuery.removeEventListener) {
				mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
			} else {
				mediaQuery.removeListener(handleMotionPreferenceChange);
			}
			window.removeEventListener("resize", handleResize);
		};
	}, []); // Never re-run — uses ref for activeIndex

	// Base orb classes
	const orbBase =
		"method-label-orb absolute rounded-full flex items-center justify-center font-mono tracking-[2px] max-md:tracking-[1px] text-white bg-glow-gold shadow-[0_0_40px_rgba(128, 94, 59, 0.4)] transition-all duration-[0.8s] ease-out cursor-pointer z-[2] text-center";
	const orbSizes =
		"w-[130px] h-[130px] md:w-[100px] md:h-[100px] max-md:w-[85px] max-md:h-[85px] max-[480px]:w-[70px] max-[480px]:h-[70px] text-[10px] max-md:text-[8px] max-[480px]:text-[7px] p-2.5 max-md:p-1.5";

	const orbData = [
		{ label: "ESCUCHA", top: "15%", left: "50%", index: 0 },
		{ label: "RITUAL", top: "60%", left: "35%", index: 1 },
		{ label: "RESULTADO", top: "60%", left: "65%", index: 2 },
	];

	return (
		<div
			ref={containerRef}
			className="method-visual-container relative w-full max-w-[340px] mx-auto aspect-square flex items-center justify-center goo-filter" style={{ top: "46px", position: "relative" }}
		>
			<canvas
				ref={canvasRef}
				className="absolute inset-0 w-full h-full pointer-events-none blur-[10px]"
			/>

			{orbData.map((orb) => (
				<button
					key={orb.index}
					className={`${orbBase} ${orbSizes} ${activeIndex === orb.index ? "active bg-glow-charcoal shadow-[0_0_50px_rgba(0,0,0,0.3)] scale-125" : ""}`}
					style={{
						top: orb.top,
						left: orb.left,
						transform:
							"translateX(-50%) translate(var(--float-x, 0px), var(--float-y, 0px)) scale(1)",
					}}
					data-index={orb.index}
					onClick={() => onOrbClick?.(orb.index)}
				>
					{orb.label}
				</button>
			))}
		</div>
	);
}
