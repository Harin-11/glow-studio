// Glow Studio — Advanced Motion Logic

/* ==========================================
   Touch / Feature Detection
   ========================================== */
const isTouchDevice = window.matchMedia(
	"(hover: none) and (pointer: coarse)",
).matches;
const isSmallScreen = () => window.innerWidth <= 768;
const isMobile = () => isTouchDevice || isSmallScreen();

/* ==========================================
   Mobile Hamburger Menu
   ========================================== */
const header = document.getElementById("main-header");
const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".mobile-nav-overlay");
const navLinks = document.querySelectorAll(".nav-link");

function openMenu() {
	header.classList.add("menu-open");
	overlay.classList.add("open");
	document.body.classList.add("menu-open");
	if (hamburger) hamburger.setAttribute("aria-expanded", "true");
}

function closeMenu() {
	header.classList.remove("menu-open");
	overlay.classList.remove("open");
	document.body.classList.remove("menu-open");
	if (hamburger) hamburger.setAttribute("aria-expanded", "false");
}

if (hamburger) {
	hamburger.addEventListener("click", () => {
		const isOpen = header.classList.contains("menu-open");
		isOpen ? closeMenu() : openMenu();
	});
}

// Close on overlay click
if (overlay) {
	overlay.addEventListener("click", closeMenu);
}

// Close on nav link click
navLinks.forEach((link) => {
	link.addEventListener("click", closeMenu);
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && header.classList.contains("menu-open")) {
		closeMenu();
	}
});

// Close on resize from mobile to desktop
let lastWidth = window.innerWidth;
window.addEventListener("resize", () => {
	const currentWidth = window.innerWidth;
	if (currentWidth > 768 && lastWidth <= 768) {
		closeMenu();
	}
	lastWidth = currentWidth;
});

/* ==========================================
   1. Smooth Inertial Scroll — skip on mobile
   ========================================== */
if (!isTouchDevice) {
	let currentScroll = 0;
	let targetScroll = 0;
	const ease = 0.075;

	function smoothScroll() {
		targetScroll = window.scrollY;
		currentScroll += (targetScroll - currentScroll) * ease;
		requestAnimationFrame(smoothScroll);
	}
	smoothScroll();
}

/* ==========================================
   2. Loader Logic (Door Opening)
   ========================================== */
window.addEventListener("load", () => {
	const loader = document.getElementById("loader");
	const loaderLine = loader.querySelector(".loader-line");

	// Initial Progress Line
	setTimeout(() => {
		loaderLine.style.transition = "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
		loaderLine.style.width = "100%";
	}, 100);

	// Trigger Door Opening
	setTimeout(() => {
		loader.classList.add("loaded");
		document.body.style.overflow = "auto";

		setTimeout(() => {
			initReveal();
		}, 800);

		setTimeout(() => {
			loader.style.display = "none";
		}, 2000);
	}, 1800);
});

document.body.style.overflow = "hidden";

/* ==========================================
   3. Custom Glow Aura Cursor — desktop only
   ========================================== */
if (!isTouchDevice) {
	const cursor = document.getElementById("cursor");
	const cursorRing = document.getElementById("cursor-ring");
	const cursorLabel = document.getElementById("cursor-label");

	let mouseX = 0,
		mouseY = 0;
	let ringX = 0,
		ringY = 0;

	document.addEventListener("mousemove", (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
		cursor.style.left = mouseX + "px";
		cursor.style.top = mouseY + "px";
	});

	function animateCursor() {
		ringX += (mouseX - ringX) * 0.1;
		ringY += (mouseY - ringY) * 0.1;
		cursorRing.style.left = ringX + "px";
		cursorRing.style.top = ringY + "px";
		requestAnimationFrame(animateCursor);
	}
	animateCursor();

	// Hover states
	const interactives = document.querySelectorAll(
		"a, button, .accordion-header, .method-label-orb",
	);
	interactives.forEach((el) => {
		el.addEventListener("mouseenter", () => {
			cursor.classList.add("hover");
			cursorRing.style.opacity = "0.4";
		});
		el.addEventListener("mouseleave", () => {
			cursor.classList.remove("hover");
			cursorRing.style.opacity = "0.15";
		});
	});

	const interactiveElements = document.querySelectorAll(
		"a, button, .accordion-header, .ritual-card",
	);
	interactiveElements.forEach((el) => {
		el.addEventListener("mouseenter", () => {
			cursor.style.width = "22px";
			cursor.style.height = "22px";
			cursorRing.style.width = "64px";
			cursorRing.style.height = "64px";
			if (el.dataset.cursor) {
				cursorLabel.textContent = el.dataset.cursor;
				cursorLabel.style.opacity = "1";
			}
		});
		el.addEventListener("mouseleave", () => {
			cursor.style.width = "14px";
			cursor.style.height = "14px";
			cursorRing.style.width = "44px";
			cursorRing.style.height = "44px";
			cursorLabel.style.opacity = "0";
		});
	});
}

// 4. Scroll Reveal Logic — uses IntersectionObserver, works everywhere
function initReveal() {
	const observerOptions = {
		threshold: 0.15,
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");

				// SVG Circle Animation if applicable
				if (entry.target.id === "metodo") {
					animateCircles();
				}
			}
		});
	}, observerOptions);

	document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function animateCircles() {
	initMethodCanvas();
}

// 4. Method Canvas (Fluid Orbs & Ambient Particles)
let methodActiveIndex = 0; // Track active orb for canvas animation

function initMethodCanvas() {
	const canvas = document.getElementById("method-canvas");
	if (!canvas) return;
	const ctx = canvas.getContext("2d");
	let width,
		height,
		blobs = [];

	function resize() {
		width = canvas.width = canvas.offsetWidth;
		height = canvas.height = canvas.offsetHeight;
	}
	window.addEventListener("resize", resize);
	resize();

	const size = Math.min(width, height);

	/* --- Blobs (ambient particles) --- */
	class Blob {
		constructor() {
			this.reset();
		}
		reset() {
			this.x = Math.random() * width;
			this.y = Math.random() * height;
			this.r = Math.random() * (size * 0.1) + size * 0.05;
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

	const blobCount = Math.max(4, Math.floor(size / 50));
	for (let i = 0; i < blobCount; i++) blobs.push(new Blob());

	/* --- Get orb positions relative to canvas --- */
	function getOrbPositions() {
		const container = canvas.parentElement;
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

	/* --- Draw fluid connection between orbs --- */
	let flowPhase = 0; // for pulsing animation

	function drawFluidConnection(positions) {
		if (positions.length < 3) return;

		const [p0, p1, p2] = positions;
		flowPhase += 0.02;

		// Smooth curve connecting the three orbs
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(p0.x, p0.y);

		// P0 → P1 with slight outward curve
		const mx1 = (p0.x + p1.x) / 2;
		const my1 = (p0.y + p1.y) / 2;
		const curve1 = size * 0.08 * Math.sin(flowPhase);
		ctx.quadraticCurveTo(
			mx1 + (p1.y - p0.y) * 0.3 + curve1,
			my1 - (p1.x - p0.x) * 0.3,
			p1.x,
			p1.y,
		);

		// P1 → P2
		const mx2 = (p1.x + p2.x) / 2;
		const my2 = (p1.y + p2.y) / 2;
		const curve2 = size * 0.08 * Math.cos(flowPhase * 0.7);
		ctx.quadraticCurveTo(
			mx2 + (p2.y - p1.y) * 0.3 + curve2,
			my2 - (p2.x - p1.x) * 0.3,
			p2.x,
			p2.y,
		);

		// P2 → P0
		const mx3 = (p2.x + p0.x) / 2;
		const my3 = (p2.y + p0.y) / 2;
		ctx.quadraticCurveTo(
			mx3 + (p0.y - p2.y) * 0.3,
			my3 - (p0.x - p2.x) * 0.3 + size * 0.06 * Math.sin(flowPhase * 0.5),
			p0.x,
			p0.y,
		);

		ctx.closePath();

		// Gradient from active orb
		const active = positions[methodActiveIndex];
		const grad = ctx.createRadialGradient(
			active.x,
			active.y,
			0,
			active.x,
			active.y,
			size * 0.6,
		);
		grad.addColorStop(0, "rgba(168, 132, 90, 0.2)");
		grad.addColorStop(0.4, "rgba(168, 132, 90, 0.08)");
		grad.addColorStop(1, "rgba(168, 132, 90, 0)");

		ctx.fillStyle = grad;
		ctx.fill();

		// Thicker stroke along connections
		ctx.strokeStyle = "rgba(168, 132, 90, 0.08)";
		ctx.lineWidth = Math.max(6, size * 0.03);
		ctx.stroke();

		ctx.restore();
	}

	/* --- Main animation loop --- */
	function animate() {
		ctx.clearRect(0, 0, width, height);

		// Draw fluid connection behind blobs
		const positions = getOrbPositions();
		drawFluidConnection(positions);

		// Draw ambient blobs
		blobs.forEach((b) => {
			b.update();
			b.draw();
		});

		// Sync HTML orbs float via CSS custom properties
		const time = Date.now() * 0.001;
		document.querySelectorAll(".method-label-orb").forEach((orb, i) => {
			const ox = Math.sin(time + i * 1.2) * 10;
			const oy = Math.cos(time * 0.8 + i * 1.2) * 8;
			orb.style.setProperty("--float-x", `${ox}px`);
			orb.style.setProperty("--float-y", `${oy}px`);
		});

		requestAnimationFrame(animate);
	}
	animate();
}

/* --- Unified orb activation --- */
function setActiveOrb(index) {
	const orbs = document.querySelectorAll(".method-label-orb");
	orbs.forEach((o) => o.classList.remove("active"));
	if (orbs[index]) {
		orbs[index].classList.add("active");
		methodActiveIndex = index;
	}
}

/* --- Interactive Orbs Linking to Accordion --- */
document.querySelectorAll(".method-label-orb").forEach((orb) => {
	orb.addEventListener("click", () => {
		const index = parseInt(orb.dataset.index);
		const accordionHeaders = document.querySelectorAll(".accordion-header");
		if (accordionHeaders[index]) {
			accordionHeaders[index].click();
		}
		setActiveOrb(index);
	});
});

/* ==========================================
   5. Parallax & Scroll Effects — throttled, skip on mobile
   ========================================== */
let scrollTicking = false;

window.addEventListener("scroll", () => {
	const scrolled = window.scrollY;

	// Header state (always runs — lightweight)
	if (scrolled > 100) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}

	// Heavy effects: skip on mobile
	if (isMobile()) return;

	if (!scrollTicking) {
		window.requestAnimationFrame(() => {
			// Parallax hero image
			const heroImage = document.querySelector(".hero-image");
			if (heroImage) {
				const val = scrolled * 0.12;
				const rotate = scrolled * 0.02;
				heroImage.style.transform = `translateY(${val}px) scale(${1 + scrolled * 0.0001}) rotate(${rotate}deg)`;
			}

			// Section brightness transitions
			const sections = document.querySelectorAll("section");
			sections.forEach((sec) => {
				const rect = sec.getBoundingClientRect();
				const center = window.innerHeight / 2;
				if (rect.top < center && rect.bottom > center) {
					sec.style.filter = "brightness(1) contrast(1)";
				} else {
					sec.style.filter = "brightness(0.95) contrast(1.02)";
				}
			});

			scrollTicking = false;
		});
		scrollTicking = true;
	}
});

/* ==========================================
   6. Rituales Grid Generation + Carousel Dots
   ========================================== */
/* ==========================================
   6. Rituales Grid — created once, no re-init
   ========================================== */
const rituales = [
	{
		name: "Ritual Facial Profundo",
		cat: "Rostro",
		cols: 7,
		img: "/assets/facial.png",
	},
	{
		name: "Escultura de Cejas",
		cat: "Rostro",
		cols: 5,
		img: "/assets/eyebrows.png",
	},
	{
		name: "Manicure Atelier",
		cat: "Manos",
		cols: 4,
		img: "/assets/manicure.png",
	},
	{
		name: "Masaje Relajante",
		cat: "Cuerpo",
		cols: 4,
		img: "/assets/massage.png",
	},
	{
		name: "Experiencia Completa",
		cat: "Completos",
		cols: 4,
		img: "/assets/hero.png",
	},
];

function initRituales() {
	const grid = document.getElementById("rituales-grid");
	if (!grid) return;

	// Build cards once — CSS handles layout at every breakpoint
	rituales.forEach((rit) => {
		const card = document.createElement("div");
		// Use the 12-column span (CSS overrides in carousel mode)
		card.style.gridColumn = `span ${rit.cols}`;
		card.className = "ritual-card reveal";
		// Always use desktop height — mobile carousel CSS overrides with aspect-ratio
		card.innerHTML = `
			<div style="position: relative; height: 400px; overflow: hidden; background: #000;">
				<img src="${rit.img}" alt="${rit.name}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.6;">
				<div style="position: absolute; bottom: 0; left: 0; padding: 2rem; width: 100%; background: linear-gradient(transparent, rgba(0,0,0,0.8));">
					<div class="label" style="color: var(--glow-gold); margin-bottom: 0.5rem;">${rit.cat}</div>
					<h3 style="color: white; font-family: var(--font-heading); font-size: 1.5rem;">${rit.name}</h3>
				</div>
			</div>
		`;
		grid.appendChild(card);
	});

	// Init dots immediately if on mobile
	updateCarouselDots();
}

/* Carousel Dots — show/hide and sync via matchMedia */
let dotsInitialized = false;
let scrollCleanup = null;

function initCarouselDots() {
	const dotsContainer = document.getElementById("rituales-dots");
	const grid = document.getElementById("rituales-grid");
	if (!dotsContainer || !grid) return;

	const cards = grid.querySelectorAll(".ritual-card");
	if (cards.length === 0) return;

	// Remove old scroll listener
	if (scrollCleanup) {
		grid.removeEventListener("scroll", scrollCleanup);
		scrollCleanup = null;
	}

	dotsContainer.innerHTML = "";

	cards.forEach((_, i) => {
		const dot = document.createElement("button");
		dot.className = i === 0 ? "carousel-dot active" : "carousel-dot";
		dot.setAttribute("aria-label", `Ir a experiencia ${i + 1}`);
		dot.addEventListener("click", () => {
			cards[i].scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "start",
			});
		});
		dotsContainer.appendChild(dot);
	});

	// Reset scroll position when entering carousel mode
	grid.scrollLeft = 0;

	let ticking = false;
	const onScroll = () => {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				const gap = 12;
				const cardWidth = cards[0]?.offsetWidth + gap || 1;
				const activeIndex = Math.min(
					Math.round(grid.scrollLeft / cardWidth),
					cards.length - 1,
				);
				dotsContainer.querySelectorAll(".carousel-dot").forEach((dot, i) => {
					dot.classList.toggle("active", i === activeIndex);
				});
				ticking = false;
			});
			ticking = true;
		}
	};
	grid.addEventListener("scroll", onScroll);
	scrollCleanup = onScroll;
}

function updateCarouselDots() {
	const isMobile = window.innerWidth <= 768;
	const dotsContainer = document.getElementById("rituales-dots");
	if (!dotsContainer) return;

	if (isMobile && !dotsInitialized) {
		initCarouselDots();
		dotsInitialized = true;
		dotsContainer.style.display = "flex";
	} else if (!isMobile && dotsInitialized) {
		dotsInitialized = false;
		dotsContainer.style.display = "none";
		// Clean up scroll listener
		const grid = document.getElementById("rituales-grid");
		if (grid && scrollCleanup) {
			grid.removeEventListener("scroll", scrollCleanup);
			scrollCleanup = null;
		}
	}
}

// Track mobile state via matchMedia (syncs with CSS breakpoint)
const mobileMQ = window.matchMedia("(max-width: 768px)");
mobileMQ.addEventListener("change", () => {
	updateCarouselDots();
});

initRituales();

// Initial dots state
updateCarouselDots();

// 6. Accordion Logic — with Orb Sync
document.querySelectorAll(".accordion-header").forEach((header, index) => {
	header.addEventListener("click", () => {
		const item = header.parentElement;
		const content = header.nextElementSibling;
		const isOpen = item.classList.contains("active");

		// Close others
		document.querySelectorAll(".accordion-item").forEach((i) => {
			i.classList.remove("active");
			i.querySelector(".accordion-content").style.maxHeight = "0px";
		});

		if (!isOpen) {
			item.classList.add("active");
			content.style.maxHeight = content.scrollHeight + "px";
			setActiveOrb(index);
		}
	});
});
