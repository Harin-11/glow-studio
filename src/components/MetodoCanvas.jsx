import { useEffect, useRef } from "react";

export default function MetodoCanvas({ activeIndex, onOrbClick }) {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext("2d");
		let width,
			height,
			blobs = [];
		let animationId;
		let flowPhase = 0;

		function resize() {
			if (!canvas) return;
			const rect = container.getBoundingClientRect();
			width = canvas.width = rect.width;
			height = canvas.height = rect.height;
		}

		resize();
		window.addEventListener("resize", resize);

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
				this.color = "rgba(168, 132, 90, 0.4)";
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

		function getOrbPositions() {
			const containerRect = container.getBoundingClientRect();
			const orbs = container.querySelectorAll(".method-label-orb");
			return Array.from(orbs).map((orb) => {
				const r = orb.getBoundingClientRect();
				return {
					x: r.left + r.width / 2 - containerRect.left,
					y: r.top + r.height / 2 - containerRect.top,
				};
			});
		}

		function drawFluidConnection(positions) {
			if (positions.length < 3) return;
			const [p0, p1, p2] = positions;
			flowPhase += 0.02;

			ctx.save();
			ctx.beginPath();
			ctx.moveTo(p0.x, p0.y);

			const mx1 = (p0.x + p1.x) / 2;
			const my1 = (p0.y + p1.y) / 2;
			const curve1 = size() * 0.08 * Math.sin(flowPhase);
			ctx.quadraticCurveTo(
				mx1 + (p1.y - p0.y) * 0.3 + curve1,
				my1 - (p1.x - p0.x) * 0.3,
				p1.x,
				p1.y,
			);

			const mx2 = (p1.x + p2.x) / 2;
			const my2 = (p1.y + p2.y) / 2;
			const curve2 = size() * 0.08 * Math.cos(flowPhase * 0.7);
			ctx.quadraticCurveTo(
				mx2 + (p2.y - p1.y) * 0.3 + curve2,
				my2 - (p2.x - p1.x) * 0.3,
				p2.x,
				p2.y,
			);

			const mx3 = (p2.x + p0.x) / 2;
			const my3 = (p2.y + p0.y) / 2;
			ctx.quadraticCurveTo(
				mx3 + (p0.y - p2.y) * 0.3,
				my3 - (p0.x - p2.x) * 0.3 + size() * 0.06 * Math.sin(flowPhase * 0.5),
				p0.x,
				p0.y,
			);

			ctx.closePath();

			const active = positions[activeIndex] || positions[0];
			const grad = ctx.createRadialGradient(
				active.x,
				active.y,
				0,
				active.x,
				active.y,
				size() * 0.6,
			);
			grad.addColorStop(0, "rgba(168, 132, 90, 0.2)");
			grad.addColorStop(0.4, "rgba(168, 132, 90, 0.08)");
			grad.addColorStop(1, "rgba(168, 132, 90, 0)");

			ctx.fillStyle = grad;
			ctx.fill();
			ctx.strokeStyle = "rgba(168, 132, 90, 0.08)";
			ctx.lineWidth = Math.max(6, size() * 0.03);
			ctx.stroke();
			ctx.restore();
		}

		function animate() {
			ctx.clearRect(0, 0, width, height);

			const positions = getOrbPositions();
			drawFluidConnection(positions);

			blobs.forEach((b) => {
				b.update();
				b.draw();
			});

			// Sync orb float via CSS custom properties
			const time = Date.now() * 0.001;
			container.querySelectorAll(".method-label-orb").forEach((orb, i) => {
				const ox = Math.sin(time + i * 1.2) * 10;
				const oy = Math.cos(time * 0.8 + i * 1.2) * 8;
				orb.style.setProperty("--float-x", `${ox}px`);
				orb.style.setProperty("--float-y", `${oy}px`);
			});

			animationId = requestAnimationFrame(animate);
		}

		animate();

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener("resize", resize);
		};
	}, [activeIndex]);

	return (
		<div
			ref={containerRef}
			className="method-visual-container relative w-full aspect-square flex items-center justify-center goo-filter"
		>
			<canvas
				ref={canvasRef}
				className="absolute inset-0 w-full h-full pointer-events-none blur-[10px]"
			/>

			<button
				className="method-label-orb active absolute w-[130px] h-[130px] md:w-[100px] md:h-[100px] max-md:w-[85px] max-md:h-[85px] max-[480px]:w-[70px] max-[480px]:h-[70px] rounded-full flex items-center justify-center font-mono text-[10px] max-md:text-[8px] max-[480px]:text-[7px] tracking-[2px] max-md:tracking-[1px] text-white bg-glow-gold shadow-[0_0_40px_rgba(168,132,90,0.4)] transition-all duration-[0.8s] ease-out cursor-pointer z-[2] text-center p-2.5 max-md:p-1.5"
				style={{
					top: "8%",
					left: "50%",
					transform:
						"translateX(-50%) translate(var(--float-x, 0px), var(--float-y, 0px)) scale(1)",
				}}
				data-index="0"
				onClick={() => onOrbClick?.(0)}
			>
				ESCUCHA
			</button>
			<button
				className="method-label-orb absolute w-[130px] h-[130px] md:w-[100px] md:h-[100px] max-md:w-[85px] max-md:h-[85px] max-[480px]:w-[70px] max-[480px]:h-[70px] rounded-full flex items-center justify-center font-mono text-[10px] max-md:text-[8px] max-[480px]:text-[7px] tracking-[2px] max-md:tracking-[1px] text-white bg-glow-gold shadow-[0_0_40px_rgba(168,132,90,0.4)] transition-all duration-[0.8s] ease-out cursor-pointer z-[2] text-center p-2.5 max-md:p-1.5"
				style={{
					top: "38%",
					left: "35%",
					transform:
						"translateX(-50%) translate(var(--float-x, 0px), var(--float-y, 0px)) scale(1)",
				}}
				data-index="1"
				onClick={() => onOrbClick?.(1)}
			>
				RITUAL
			</button>
			<button
				className="method-label-orb absolute w-[130px] h-[130px] md:w-[100px] md:h-[100px] max-md:w-[85px] max-md:h-[85px] max-[480px]:w-[70px] max-[480px]:h-[70px] rounded-full flex items-center justify-center font-mono text-[10px] max-md:text-[8px] max-[480px]:text-[7px] tracking-[2px] max-md:tracking-[1px] text-white bg-glow-gold shadow-[0_0_40px_rgba(168,132,90,0.4)] transition-all duration-[0.8s] ease-out cursor-pointer z-[2] text-center p-2.5 max-md:p-1.5"
				style={{
					top: "38%",
					left: "65%",
					transform:
						"translateX(-50%) translate(var(--float-x, 0px), var(--float-y, 0px)) scale(1)",
				}}
				data-index="2"
				onClick={() => onOrbClick?.(2)}
			>
				RESULTADO
			</button>
		</div>
	);
}
