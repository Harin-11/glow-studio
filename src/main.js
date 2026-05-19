// Glow Studio — Advanced Motion Logic

// 1. Smooth Inertial Scroll (Simple Implementation)
let currentScroll = 0;
let targetScroll = 0;
const ease = 0.075;

function smoothScroll() {
    targetScroll = window.scrollY;
    currentScroll += (targetScroll - currentScroll) * ease;
    
    // Applying smoothing to a main wrapper if we had one, 
    // but for now we apply it to parallax elements for extra smoothness
    requestAnimationFrame(smoothScroll);
}
smoothScroll();

// 2. Loader Logic (Door Opening)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const loaderLine = loader.querySelector('.loader-line');
    
    // Initial Progress Line
    setTimeout(() => {
        loaderLine.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        loaderLine.style.width = '100%';
    }, 100);

    // Trigger Door Opening
    setTimeout(() => {
        loader.classList.add('loaded');
        document.body.style.overflow = 'auto'; // Unlock scroll
        
        setTimeout(() => {
            initReveal(); // Start reveal animations
        }, 800);
        
        // Remove from DOM eventually to free resources
        setTimeout(() => {
            loader.style.display = 'none';
        }, 2000);
    }, 1800);
});

// Initially lock scroll
document.body.style.overflow = 'hidden';

// 2. Custom Glow Aura Cursor
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Interaction States
const interactives = document.querySelectorAll('a, button, .accordion-header, .method-label-orb');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorRing.style.opacity = '0.4';
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorRing.style.opacity = '0.15';
    });
});

// Cursor Interaction States
const interactiveElements = document.querySelectorAll('a, button, .accordion-header, .ritual-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '22px';
        cursor.style.height = '22px';
        cursorRing.style.width = '64px';
        cursorRing.style.height = '64px';
        
        if (el.dataset.cursor) {
            cursorLabel.textContent = el.dataset.cursor;
            cursorLabel.style.opacity = '1';
        }
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '14px';
        cursor.style.height = '14px';
        cursorRing.style.width = '44px';
        cursorRing.style.height = '44px';
        cursorLabel.style.opacity = '0';
    });
});

// 3. Scroll Reveal Logic
function initReveal() {
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // SVG Circle Animation if applicable
                if (entry.target.id === 'metodo') {
                    animateCircles();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function animateCircles() {
    initMethodCanvas();
}

// 4. Method Canvas (Fluid Orbs & Ambient Particles)
function initMethodCanvas() {
    const canvas = document.getElementById('method-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, blobs = [];

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Blob {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.r = Math.random() * 80 + 40;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.color = 'rgba(168, 132, 90, 0.6)';
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

    for (let i = 0; i < 8; i++) blobs.push(new Blob());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        blobs.forEach(b => {
            b.update();
            b.draw();
        });
        
        // Sync HTML orbs with subtle float
        const time = Date.now() * 0.001;
        document.querySelectorAll('.method-label-orb').forEach((orb, i) => {
            const ox = Math.sin(time + i) * 15;
            const oy = Math.cos(time * 0.8 + i) * 15;
            orb.style.transform = `translate(${ox}px, ${oy}px) ${orb.classList.contains('active') ? 'scale(1.25)' : 'scale(1)'}`;
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// Interactive Orbs Linking to Accordion
document.querySelectorAll('.method-label-orb').forEach(orb => {
    orb.addEventListener('click', () => {
        const index = orb.dataset.index;
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        if (accordionHeaders[index]) {
            accordionHeaders[index].click();
            
            // Highlight Orb
            document.querySelectorAll('.method-label-orb').forEach(o => o.classList.remove('active'));
            orb.classList.add('active');
        }
    });
});

// 4. Parallax & Scroll Effects
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Header state
    const header = document.getElementById('main-header');
    if (scrolled > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Parallax hero image with scale & skew
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const val = scrolled * 0.12;
        const rotate = scrolled * 0.02;
        heroImage.style.transform = `translateY(${val}px) scale(${1 + scrolled * 0.0001}) rotate(${rotate}deg)`;
    }
    
    // Advanced Section Transitions (Brightness & Contrast)
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        const center = window.innerHeight / 2;
        if (rect.top < center && rect.bottom > center) {
            sec.style.filter = 'brightness(1) contrast(1)';
        } else {
            sec.style.filter = 'brightness(0.95) contrast(1.02)';
        }
    });
});

// 5. Rituales Grid Generation (Mock data)
const rituales = [
    { name: "Ritual Facial Profundo", cat: "Rostro", cols: 7, img: "/assets/facial.png" },
    { name: "Escultura de Cejas", cat: "Rostro", cols: 5, img: "/assets/eyebrows.png" },
    { name: "Manicure Atelier", cat: "Manos", cols: 4, img: "/assets/manicure.png" },
    { name: "Masaje Relajante", cat: "Cuerpo", cols: 4, img: "/assets/massage.png" },
    { name: "Experiencia Completa", cat: "Completos", cols: 4, img: "/assets/hero.png" }
];

const grid = document.getElementById('rituales-grid');
rituales.forEach(rit => {
    const card = document.createElement('div');
    card.style.gridColumn = `span ${rit.cols}`;
    card.className = 'ritual-card reveal';
    card.innerHTML = `
        <div style="position: relative; height: 400px; overflow: hidden; background: #000;">
            <img src="${rit.img}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);">
            <div style="position: absolute; bottom: 0; left: 0; padding: 2rem; width: 100%; background: linear-gradient(transparent, rgba(0,0,0,0.8));">
                <div class="label" style="color: var(--glow-gold); margin-bottom: 0.5rem;">${rit.cat}</div>
                <h3 style="color: white; font-family: var(--font-heading); font-size: 1.5rem;">${rit.name}</h3>
            </div>
        </div>
    `;
    grid.appendChild(card);
});

// 6. Accordion Logic
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = header.nextElementSibling;
        const isOpen = item.classList.contains('active');
        
        // Close others
        document.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.accordion-content').style.maxHeight = '0px';
        });

        if (!isOpen) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});
