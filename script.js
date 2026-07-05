/* ===== Loading Screen ===== */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1000);
});

/* ===== DOM Elements ===== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('back-to-top');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const contactForm = document.getElementById('contactForm');

/* ===== Sticky Navigation ===== */
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('show');
    }
    updateActiveNavLink();
});

/* ===== Mobile Navigation ===== */
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    navToggle.innerHTML = navMenu.classList.contains('show')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

/* Dropdown on mobile */
document.querySelectorAll('.dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            link.parentElement.classList.toggle('active');
        }
    });
});

/* ===== Active Nav Link ===== */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/* ===== Hero Slider ===== */
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const indicatorsContainer = document.querySelector('.slider-indicators');
let currentSlide = 0;
let autoSlideInterval;

slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}
startAutoSlide();

/* ===== Statistics Counter ===== */
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 80;
        let current = 0;
        const update = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.round(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        };
        update();
    });
}

/* ===== Scroll Animations (Intersection Observer) ===== */
const animateElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .zoom-in');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            if (entry.target.classList.contains('counter') || entry.target.closest('.stats-section')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

/* Also observe stats section for counter animation */
const statsSection = document.querySelector('.stats-section');
if (statsSection) observer.observe(statsSection);

/* ===== Dark Mode ===== */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

darkModeToggle.addEventListener('click', toggleDarkMode);

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

/* ===== Back to Top ===== */
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== Smooth Scrolling for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ===== Course Tabs ===== */
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
    });
});

/* ===== Department Search ===== */
const deptSearch = document.getElementById('deptSearch');
if (deptSearch) {
    deptSearch.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        document.querySelectorAll('.dept-card').forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            card.style.display = name.includes(query) ? 'block' : 'none';
        });
    });
}

/* ===== Faculty Search ===== */
const facultySearch = document.getElementById('facultySearch');
if (facultySearch) {
    facultySearch.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        document.querySelectorAll('.faculty-card').forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            const dept = card.getAttribute('data-dept').toLowerCase();
            card.style.display = (name.includes(query) || dept.includes(query)) ? 'block' : 'none';
        });
    });
}

/* ===== Gallery Filter ===== */
const galleryFilters = document.querySelectorAll('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        galleryFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        const category = filter.getAttribute('data-filter');
        galleryItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

/* ===== Gallery Lightbox ===== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let currentGalleryIndex = 0;
let visibleGalleryItems = [];

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        visibleGalleryItems = Array.from(document.querySelectorAll('.gallery-item[style*="block"], .gallery-item:not([style*="none"])'));
        if (visibleGalleryItems.length === 0) visibleGalleryItems = Array.from(galleryItems);
        currentGalleryIndex = visibleGalleryItems.indexOf(item);
        if (currentGalleryIndex === -1) currentGalleryIndex = 0;
        const img = visibleGalleryItems[currentGalleryIndex].querySelector('img');
        lightboxImg.src = img.src;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
}

lightboxPrev.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
    const img = visibleGalleryItems[currentGalleryIndex].querySelector('img');
    lightboxImg.src = img.src;
});

lightboxNext.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % visibleGalleryItems.length;
    const img = visibleGalleryItems[currentGalleryIndex].querySelector('img');
    lightboxImg.src = img.src;
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
});

/* ===== Event Countdown ===== */
function updateCountdown() {
    const eventDate = new Date('2026-08-15T09:00:00').getTime();
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
}
if (document.getElementById('countdown')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ===== Student Testimonials Slider ===== */
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.querySelector('.testimonial-dots');
let testimonialIndex = 0;

if (testimonialCards.length > 0) {
    testimonialCards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(i));
        dotsContainer.appendChild(dot);
    });

    function goToTestimonial(index) {
        testimonialCards.forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.testimonial-dots .dot').forEach(d => d.classList.remove('active'));
        testimonialIndex = (index + testimonialCards.length) % testimonialCards.length;
        testimonialCards[testimonialIndex].classList.add('active');
        document.querySelectorAll('.testimonial-dots .dot')[testimonialIndex].classList.add('active');
    }

    setInterval(() => goToTestimonial(testimonialIndex + 1), 4000);
}

/* ===== FAQ Accordion ===== */
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

/* ===== Contact Form Validation ===== */
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        const fields = [
            { el: name, test: v => v.trim().length >= 3, msg: 'Name must be at least 3 characters' },
            { el: email, test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email' },
            { el: phone, test: v => /^[0-9+\-\s()]{10,15}$/.test(v), msg: 'Please enter a valid phone number' },
            { el: subject, test: v => v.trim().length > 0, msg: 'Subject is required' },
            { el: message, test: v => v.trim().length > 0, msg: 'Message is required' }
        ];

        fields.forEach(({ el, test, msg }) => {
            const group = el.closest('.form-group');
            const errorMsg = group.querySelector('.error-msg');
            if (test(el.value)) {
                group.classList.remove('error');
                group.classList.add('success');
                errorMsg.textContent = '';
            } else {
                group.classList.remove('success');
                group.classList.add('error');
                errorMsg.textContent = msg;
                isValid = false;
            }
        });

        if (isValid) {
            showToast('Thank you for contacting us! We will get back to you soon.', 'success');
            contactForm.reset();
            document.querySelectorAll('.form-group').forEach(g => g.classList.remove('success'));
        } else {
            showToast('Please fill in all required fields correctly.', 'error');
        }
    });
}

/* ===== Toast Notifications ===== */
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

/* ===== Apply Now & Brochure Buttons ===== */
document.querySelectorAll('.admission-buttons .btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Redirecting to the online application portal...', 'info');
    });
});

document.querySelectorAll('.admission-buttons .btn-secondary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Brochure download started!', 'success');
    });
});

/* ===== Register Now buttons ===== */
document.querySelectorAll('.event-card .btn-sm').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Registration successful for the event!', 'success');
    });
});

/* ===== Learn More buttons ===== */
document.querySelectorAll('.dept-card .btn-sm').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const deptName = btn.closest('.dept-card').querySelector('h3').textContent;
        showToast(`Exploring ${deptName} department details...`, 'info');
        localStorage.setItem('lastViewedDept', deptName);
    });
});

/* ===== Restore Last Viewed Department ===== */
const lastDept = localStorage.getItem('lastViewedDept');
if (lastDept) {
    console.log(`Last viewed department: ${lastDept}`);
}

/* ===== Contact Form Draft Auto-save ===== */
const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        const formData = {};
        formInputs.forEach(i => formData[i.name] = i.value);
        localStorage.setItem('contactFormDraft', JSON.stringify(formData));
    });
});

const savedDraft = localStorage.getItem('contactFormDraft');
if (savedDraft && contactForm) {
    try {
        const formData = JSON.parse(savedDraft);
        formInputs.forEach(input => {
            if (formData[input.name]) input.value = formData[input.name];
        });
    } catch (e) { /* ignore */ }
}
