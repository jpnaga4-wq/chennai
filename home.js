// ============================================
// DATA
// ============================================
const slidesData = [{
    id: 0,
    eyebrow: 'SIGNAGE • BRANDING • PRINTING',
    number: '01 / SIGNAGE',
    headline: 'Make your brand<br /><span class="highlight-italic">impossible</span> to miss.',
    body: 'Premium indoor and outdoor signage solutions designed to make businesses stand out, attract attention and build stronger visibility.',
    buttons: [
        { text: 'Explore Services ↗', class: 'btn-primary', href: 'services.html' },
        { text: 'Get a Free Quote ↗', class: 'btn-secondary', href: 'contact.html' }
    ],
    image: 'che-ban-1.png'
}, {
    id: 1,
    eyebrow: 'LED • ACP • METAL • 3D',
    number: '02 / BRAND VISIBILITY',
    headline: 'Turn your location into a<br /><span class="highlight-italic">landmark</span>.',
    body: 'From illuminated facades to premium 3D lettering, we create signage that works day and night.',
    buttons: [
        { text: 'View Solutions ↗', class: 'btn-primary', href: 'services.html' },
        { text: 'Start a Project ↗', class: 'btn-secondary', href: 'contact.html' }
    ],
    image: 'che-ban-2.png'
}, {
    id: 2,
    eyebrow: 'OUTDOOR • PRINT • CREATIVE',
    number: '03 / COMPLETE BRANDING',
    headline: 'One partner for your<br />visual identity.',
    body: 'Design, manufacture, printing and professional installation — brought together under one experienced team.',
    buttons: [
        { text: 'See Our Work ↗', class: 'btn-primary', href: 'gallery.html' },
        { text: 'Get a Free Quote ↗', class: 'btn-secondary', href: 'contact.html' }
    ],
    image: 'che-ban-3.png'
}];
const servicesData = [
    { title: 'LED Boards', desc: 'Illuminated signage engineered for day-and-night visibility.', img: 'led-1.jpg' },
    { title: 'ACP Signage', desc: 'Clean commercial signage and cladding with a modern finish.', img: 'led-7.jpg' },
    { title: 'Hoardings', desc: 'High-impact outdoor advertising built for maximum reach.', img: 'hoarding-6.jpg' },
    { title: 'Printing Work', desc: 'Large-format and commercial printing for campaigns and displays.', img: 'Backlit-2.JPG' },
    { title: 'Branding', desc: 'Consistent visual branding across every customer touchpoint.', img: 'hoarding-5.JPG' },
    { title: 'Creative Jobs', desc: 'Custom creative concepts and installations around your location.', img: 'costom-2.JPG' }
];

const processData = [
    { num: '01', title: 'Understand', desc: 'Business, location and requirement.' },
    { num: '02', title: 'Design', desc: 'Concept and visual direction.' },
    { num: '03', title: 'Manufacture', desc: 'Quality production and finishing.' },
    { num: '04', title: 'Install', desc: 'Professional site execution.' },
    { num: '05', title: 'Deliver', desc: 'A finished brand asset ready to perform.' }
];

// ============================================
// FAQ ACCORDION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
});

// ============================================
// HERO SLIDER - 2 Second Autoplay
// ============================================
class HeroSlider {
    constructor() {
        this.track = document.querySelector('.hero-track');
        this.indicators = document.querySelector('.slide-indicators');
        this.prevBtn = document.querySelector('.slide-prev');
        this.nextBtn = document.querySelector('.slide-next');
        this.progressBar = document.querySelector('.progress-bar');
        this.current = 0;
        this.total = slidesData.length;
        this.interval = null;
        this.isTransitioning = false;
        this.progress = 0;
        this.slideDuration = 2000; // Changed to 2 seconds

        this.init();
    }

    init() {
        this.renderSlides();
        this.renderIndicators();
        this.goTo(0, false);
        this.startAutoplay();
        this.bindEvents();
        this.updateLocationInfo();
    }

    renderSlides() {
        this.track.innerHTML = '';
        slidesData.forEach((data, i) => {
            const slide = document.createElement('div');
            slide.className = `hero-slide ${i === 0 ? 'active' : ''}`;
            slide.dataset.index = i;
            slide.innerHTML = `
                <img class="slide-bg" src="${data.image}" alt="${data.eyebrow}" loading="${i === 0 ? 'eager' : 'lazy'}" />
                <div class="slide-overlay"></div>
                <div class="slide-content">
                    <div class="slide-eyebrow">${data.eyebrow}</div>
                    <div class="slide-number">${data.number}</div>
                    <h1>${data.headline}</h1>
                    <p class="slide-body">${data.body}</p>
                    <div class="slide-buttons">
                        ${data.buttons.map(b => `<a href="#contact" class="${b.class}">${b.text}</a>`).join('')}
                    </div>
                </div>
            `;
            this.track.appendChild(slide);
        });
    }

    renderIndicators() {
        this.indicators.innerHTML = '';
        for (let i = 0; i < this.total; i++) {
            const dot = document.createElement('span');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                this.stopAutoplay();
                this.goTo(i);
                this.startAutoplay();
            });
            this.indicators.appendChild(dot);
        }
    }

    goTo(index, animate = true) {
        if (this.isTransitioning || index === this.current) return;
        this.isTransitioning = true;

        const slides = this.track.querySelectorAll('.hero-slide');
        const dots = this.indicators.querySelectorAll('.dot');

        slides.forEach(s => {
            s.classList.remove('active');
            const highlight = s.querySelector('.highlight-italic');
            if (highlight) highlight.classList.remove('animate');
        });
        dots.forEach(d => d.classList.remove('active'));

        this.current = (index + this.total) % this.total;
        slides[this.current].classList.add('active');
        dots[this.current].classList.add('active');

        const highlight = slides[this.current].querySelector('.highlight-italic');
        if (highlight) {
            setTimeout(() => highlight.classList.add('animate'), 400);
        }

        this.updateLocationInfo();
        this.resetProgress();

        setTimeout(() => {
            this.isTransitioning = false;
        }, 1000);
    }

    next() {
        this.goTo(this.current + 1);
    }

    prev() {
        this.goTo(this.current - 1);
    }

    startAutoplay() {
        this.stopAutoplay();
        this.resetProgress();
        this.interval = setInterval(() => {
            this.next();
        }, this.slideDuration);
        this.startProgress();
    }

    stopAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    resetProgress() {
        this.progress = 0;
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
        }
    }

    startProgress() {
        this.resetProgress();
        const step = 100 / (this.slideDuration / 16);
        if (this.progressInterval) clearInterval(this.progressInterval);
        this.progressInterval = setInterval(() => {
            this.progress += step;
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(this.progressInterval);
                this.progressInterval = null;
            }
            if (this.progressBar) {
                this.progressBar.style.width = this.progress + '%';
            }
        }, 16);
    }

    updateLocationInfo() {
        const location = document.querySelector('.hero-location');
        if (location) {
            const num = String(this.current + 1).padStart(2, '0');
            location.innerHTML = `${num}<br />Chennai, Tamil Nadu<br />Visual branding partner`;
        }
    }

    bindEvents() {
        this.nextBtn.addEventListener('click', () => {
            this.stopAutoplay();
            this.next();
            this.startAutoplay();
        });

        this.prevBtn.addEventListener('click', () => {
            this.stopAutoplay();
            this.prev();
            this.startAutoplay();
        });

        let startX = 0;
        let startY = 0;
        this.track.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
            startY = e.changedTouches[0].screenY;
            this.stopAutoplay();
        }, { passive: true });

        this.track.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].screenX;
            const endY = e.changedTouches[0].screenY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) this.next();
                else this.prev();
                this.startAutoplay();
            }
        }, { passive: true });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.stopAutoplay();
                this.next();
                this.startAutoplay();
            } else if (e.key === 'ArrowLeft') {
                this.stopAutoplay();
                this.prev();
                this.startAutoplay();
            }
        });

        this.track.addEventListener('mouseenter', () => {
            this.stopAutoplay();
        });
        this.track.addEventListener('mouseleave', () => {
            this.startAutoplay();
        });
    }
}

// ============================================
// MOBILE MENU
// ============================================
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.links = this.mobileMenu.querySelectorAll('a');
        this.isOpen = false;
        this.init();
    }

    init() {
        this.hamburger.addEventListener('click', () => this.toggle());
        this.links.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        this.mobileMenu.addEventListener('click', (e) => {
            if (e.target === this.mobileMenu) this.close();
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.hamburger.classList.toggle('active');
        this.mobileMenu.classList.toggle('open');
        this.hamburger.setAttribute('aria-expanded', this.isOpen);
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }

    close() {
        if (this.isOpen) {
            this.isOpen = false;
            this.hamburger.classList.remove('active');
            this.mobileMenu.classList.remove('open');
            this.hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
}

// ============================================
// SCROLL EFFECTS
// ============================================
class ScrollEffects {
    constructor() {
        this.header = document.querySelector('.site-header');
        this.backToTop = document.querySelector('.back-to-top');
        this.animatedElements = document.querySelectorAll('.animate-on-scroll');
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.observer = null;
        this.statsAnimated = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            this.header.classList.toggle('scrolled', scrollY > 60);
            this.backToTop.classList.toggle('visible', scrollY > 500);
        }, { passive: true });

        this.backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    const highlight = entry.target.querySelector('.highlight-italic');
                    if (highlight) {
                        setTimeout(() => highlight.classList.add('animate'), 300);
                    }
                    if (entry.target.querySelector('.stat-number') && !this.statsAnimated) {
                        this.statsAnimated = true;
                        this.animateStats();
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        this.animatedElements.forEach(el => this.observer.observe(el));
        this.observeDynamic();
    }

    observeDynamic() {
        const observer = new MutationObserver(() => {
            document.querySelectorAll('.service-card, .process-step, .why-card, .industry-item, .testimonial-card, .faq-item, .blog-card').forEach(el => {
                if (!el.classList.contains('observed')) {
                    el.classList.add('animate-on-scroll', 'observed');
                    this.observer.observe(el);
                }
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    animateStats() {
        this.statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            if (isNaN(target)) return;
            let current = 0;
            const increment = Math.ceil(target / 60);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = current + (target === 24 ? '/' : '+');
            }, 30);
        });
    }
}

// ============================================
// RENDER SERVICES & PROCESS
// ============================================
function renderServices() {
    const grid = document.getElementById('services-grid');
    grid.innerHTML = '';
    servicesData.forEach((service, i) => {
        const card = document.createElement('div');
        card.className = `service-card animate-on-scroll delay-${i % 6}`;
        card.innerHTML = `
            <img class="card-bg" src="${service.img}" alt="${service.title}" loading="lazy" />
            <div class="card-overlay">
                <div class="card-num">${String(i + 1).padStart(2, '0')} / SERVICE</div>
                <h3>${service.title}</h3>
                <p>${service.desc}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderProcess() {
    const grid = document.getElementById('process-grid');
    grid.innerHTML = '';
    processData.forEach((step, i) => {
        const div = document.createElement('div');
        div.className = `process-step animate-on-scroll delay-${i % 5}`;
        div.innerHTML = `
            <span class="step-num">${step.num}</span>
            <h4>${step.title}</h4>
            <p>${step.desc}</p>
        `;
        grid.appendChild(div);
    });
}

// ============================================
// FORM HANDLING
// ============================================
class FormHandler {
    constructor() {
        this.form = document.getElementById('quote-form');
        this.successMsg = this.form.querySelector('.form-success');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validate()) {
                this.showSuccess();
            }
        });

        this.form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            });
            input.addEventListener('change', () => {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            });
        });
    }

    validate() {
        const inputs = this.form.querySelectorAll('[required]');
        let valid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = '#e53935';
                input.style.boxShadow = '0 0 0 4px rgba(229, 57, 53, 0.1)';
            } else {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            }
        });

        const email = this.form.querySelector('input[type="email"]');
        if (email && email.value) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(email.value)) {
                valid = false;
                email.style.borderColor = '#e53935';
                email.style.boxShadow = '0 0 0 4px rgba(229, 57, 53, 0.1)';
            }
        }

        const phone = this.form.querySelector('input[type="tel"]');
        if (phone && phone.value && phone.value.length < 10) {
            valid = false;
            phone.style.borderColor = '#e53935';
            phone.style.boxShadow = '0 0 0 4px rgba(229, 57, 53, 0.1)';
        }

        return valid;
    }

    showSuccess() {
        this.successMsg.classList.remove('hidden');
        this.form.reset();
        this.successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            this.successMsg.classList.add('hidden');
        }, 6000);
    }
}

// ============================================
// PARALLAX EFFECT ON HERO
// ============================================
class ParallaxEffect {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const hero = document.querySelector('.hero-section');
            const rect = hero.getBoundingClientRect();
            if (rect.top < 0) {
                const scrolled = Math.abs(rect.top);
                this.slides.forEach(slide => {
                    if (slide.classList.contains('active')) {
                        const bg = slide.querySelector('.slide-bg');
                        if (bg) {
                            const translate = scrolled * 0.3;
                            bg.style.transform = `scale(1.05) translateY(${translate}px)`;
                        }
                    }
                });
            }
        }, { passive: true });
    }
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    renderProcess();

    const slider = new HeroSlider();
    const mobileMenu = new MobileMenu();
    const scrollEffects = new ScrollEffects();
    const formHandler = new FormHandler();
    const parallax = new ParallaxEffect();

    window.__slider = slider;
});


// ============================================
// about us page
// ============================================
