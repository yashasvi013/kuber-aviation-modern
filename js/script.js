// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTopBtn = document.getElementById('backToTop');
const bookingForm = document.getElementById('bookingForm');
const testimonialItems = document.querySelectorAll('.testimonial-item');
let currentTestimonial = 0;

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Header scroll effect - Keep transparent navbar
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    // Keep the transparent navbar throughout scrolling
    header.style.background = 'rgba(0, 0, 0, 0.3)';
    header.style.boxShadow = 'none';
    header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';

    // Back to top button
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Select package and scroll to contact
function selectPackage(packageName) {
    const packageSelect = document.getElementById('package');
    if (packageSelect) {
        packageSelect.value = packageName;
    }
    scrollToContact();
}

// Handle booking form submission
function handleBookingSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showNotification('Booking request submitted successfully! We will contact you soon.', 'success');
    
    // Reset form
    bookingForm.reset();
    
    // Log the data (in a real application, this would be sent to a server)
    console.log('Booking Data:', data);
}

// Testimonial slider
function changeTestimonial(direction) {
    testimonialItems[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + direction + testimonialItems.length) % testimonialItems.length;
    testimonialItems[currentTestimonial].classList.add('active');
}

// Auto-rotate testimonials
setInterval(() => {
    changeTestimonial(1);
}, 5000);

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification styles
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
}

.notification.show {
    transform: translateX(0);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
}

.notification-success {
    border-left: 4px solid #10b981;
}

.notification-success i {
    color: #10b981;
}

.notification-info {
    border-left: 4px solid #3b82f6;
}

.notification-info i {
    color: #3b82f6;
}

.notification-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #6b7280;
    margin-left: auto;
}

.notification-close:hover {
    color: #374151;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.package-card, .safety-item, .trust-item, .testimonial-item, ' +
        '.section-header, .contact-item, .faq-item, .hero-title, ' +
        '.hero-description, .hero-actions, .hero-contact'
    );
    animateElements.forEach(el => observer.observe(el));
});

// Add animation styles
const animationStyles = `
<style>
/* Base Animation Classes */
.animate-element {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
}

.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Hero Section Animations */
.hero-title {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
    transition: all 1s ease-out 0.3s;
}

.hero-title.animate-in {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.hero-description {
    opacity: 0;
    transform: translateY(40px);
    transition: all 1s ease-out 0.6s;
}

.hero-description.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.hero-actions {
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease-out 0.9s;
}

.hero-actions.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.hero-contact {
    opacity: 0;
    transform: translateY(20px);
    transition: all 1s ease-out 1.2s;
}

.hero-contact.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Trust Indicators */
.trust-item {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
    transition: all 0.6s ease-out;
}

.trust-item.animate-in {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.trust-item:nth-child(1) { transition-delay: 0.1s; }
.trust-item:nth-child(2) { transition-delay: 0.2s; }
.trust-item:nth-child(3) { transition-delay: 0.3s; }
.trust-item:nth-child(4) { transition-delay: 0.4s; }

/* Section Headers */
.section-header {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
}

.section-header.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.section-title {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out 0.2s;
}

.section-header.animate-in .section-title {
    opacity: 1;
    transform: translateY(0);
}

.section-subtitle {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out 0.4s;
}

.section-header.animate-in .section-subtitle {
    opacity: 1;
    transform: translateY(0);
}

/* Package Cards */
.package-card {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
    transition: all 0.8s ease-out;
}

.package-card.animate-in {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.package-card:nth-child(1) { transition-delay: 0.1s; }
.package-card:nth-child(2) { transition-delay: 0.2s; }
.package-card:nth-child(3) { transition-delay: 0.3s; }
.package-card:nth-child(4) { transition-delay: 0.4s; }
.package-card:nth-child(5) { transition-delay: 0.5s; }

/* Safety Items */
.safety-item {
    opacity: 0;
    transform: translateX(-40px);
    transition: all 0.6s ease-out;
}

.safety-item.animate-in {
    opacity: 1;
    transform: translateX(0);
}

.safety-item:nth-child(1) { transition-delay: 0.1s; }
.safety-item:nth-child(2) { transition-delay: 0.2s; }
.safety-item:nth-child(3) { transition-delay: 0.3s; }
.safety-item:nth-child(4) { transition-delay: 0.4s; }

/* Testimonials */
.testimonial-item {
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.6s ease-out;
}

.testimonial-item.animate-in {
    opacity: 1;
    transform: scale(1);
}

/* Contact Items */
.contact-item {
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.6s ease-out;
}

.contact-item.animate-in {
    opacity: 1;
    transform: translateX(0);
}

.contact-item:nth-child(1) { transition-delay: 0.1s; }
.contact-item:nth-child(2) { transition-delay: 0.2s; }
.contact-item:nth-child(3) { transition-delay: 0.3s; }
.contact-item:nth-child(4) { transition-delay: 0.4s; }

/* Contact Form */
.contact-form {
    opacity: 0;
    transform: translateX(40px);
    transition: all 0.8s ease-out 0.3s;
}

.contact-form.animate-in {
    opacity: 1;
    transform: translateX(0);
}

/* FAQ Items */
.faq-item {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
}

.faq-item.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.faq-item:nth-child(1) { transition-delay: 0.1s; }
.faq-item:nth-child(2) { transition-delay: 0.2s; }
.faq-item:nth-child(3) { transition-delay: 0.3s; }
.faq-item:nth-child(4) { transition-delay: 0.4s; }

/* CTA Section */
.cta-content {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease-out;
}

.cta-content.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.cta-title {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out 0.2s;
}

.cta-content.animate-in .cta-title {
    opacity: 1;
    transform: translateY(0);
}

.cta-description {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out 0.4s;
}

.cta-content.animate-in .cta-description {
    opacity: 1;
    transform: translateY(0);
}

.cta-actions {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out 0.6s;
}

.cta-content.animate-in .cta-actions {
    opacity: 1;
    transform: translateY(0);
}

/* Floating Elements Animation */
.float-element {
    animation: float 6s ease-in-out infinite;
}

.float-element.helicopter {
    animation-delay: 0s;
}

.float-element.mountain {
    animation-delay: 2s;
}

.float-element.cloud {
    animation-delay: 4s;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
    }
    25% {
        transform: translateY(-15px) rotate(2deg);
    }
    50% {
        transform: translateY(-25px) rotate(0deg);
    }
    75% {
        transform: translateY(-15px) rotate(-2deg);
    }
}

/* Page Load Animations */
.page-header .page-title {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out 0.3s;
}

.page-header.animate-in .page-title {
    opacity: 1;
    transform: translateY(0);
}

.page-header .page-subtitle {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out 0.6s;
}

.page-header.animate-in .page-subtitle {
    opacity: 1;
    transform: translateY(0);
}

.page-header .breadcrumb {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out 0.9s;
}

.page-header.animate-in .breadcrumb {
    opacity: 1;
    transform: translateY(0);
}

/* Map Section */
.map-placeholder {
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.8s ease-out;
}

.map-placeholder.animate-in {
    opacity: 1;
    transform: scale(1);
}

/* Enhanced Hover Effects */
.package-card:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.safety-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
}

.trust-item:hover {
    transform: translateY(-5px) scale(1.05);
}

/* Staggered Animation for Grid Items */
@media (min-width: 768px) {
    .packages-grid .package-card {
        opacity: 0;
        transform: translateY(60px) scale(0.9);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .packages-grid .package-card.animate-in {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    
    .packages-grid .package-card:nth-child(1) { transition-delay: 0.1s; }
    .packages-grid .package-card:nth-child(2) { transition-delay: 0.2s; }
    .packages-grid .package-card:nth-child(3) { transition-delay: 0.3s; }
    .packages-grid .package-card:nth-child(4) { transition-delay: 0.4s; }
    .packages-grid .package-card:nth-child(5) { transition-delay: 0.5s; }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', animationStyles);

// Phone number formatting
document.getElementById('phone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// Form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const package = document.getElementById('package').value;
    
    let errors = [];
    
    if (name.length < 3) {
        errors.push('Name must be at least 3 characters long');
    }
    
    if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!isValidPhone(phone)) {
        errors.push('Please enter a valid 10-digit phone number');
    }
    
    if (!package) {
        errors.push('Please select a package');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.type === 'submit') return;
        
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 1500);
    });
});

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(() => {
    // Scroll-based animations or calculations
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Initialize typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Beautiful word-by-word animation with simultaneous line fade
    const heroElement = document.getElementById('hero-typing-text');
    if (heroElement) {
        // Define words in lines
        const wordsByLines = [
            [{ text: "FLY", gold: true }, { text: "KUBER", gold: true }],
            [{ text: "Your", gold: false }, { text: "Spiritual", gold: false }],
            [{ text: "Journey", gold: false }, { text: "Made", gold: false }],
            [{ text: "Effortless", gold: true }]
        ];
        
        let currentLineIndex = 0;
        let wordElements = [];
        
        // Set fixed height and width to prevent layout shift
        heroElement.style.height = '120px';
        heroElement.style.width = '100%';
        heroElement.style.maxWidth = '800px';
        heroElement.style.display = 'flex';
        heroElement.style.alignItems = 'center';
        heroElement.style.flexWrap = 'wrap';
        heroElement.style.overflow = 'visible';
        heroElement.style.justifyContent = 'flex-start';
        
        function startAnimation() {
            // Clear and reset
            heroElement.innerHTML = '';
            wordElements = [];
            currentLineIndex = 0;
            
            // Start showing all lines
            showAllLines();
        }
        
        function showAllLines() {
            if (currentLineIndex >= wordsByLines.length) {
                // All lines shown, wait 3 seconds then restart
                setTimeout(() => {
                    // Fade out all lines
                    wordElements.forEach((lineEl, index) => {
                        setTimeout(() => {
                            lineEl.style.opacity = '0';
                            lineEl.style.transform = 'translateX(30px)';
                        }, index * 200);
                    });
                    
                    // Start fresh after fade out
                    setTimeout(() => {
                        startAnimation();
                    }, 2000);
                }, 3000);
                return;
            }
            
            const currentLine = wordsByLines[currentLineIndex];
            
            // Create line container
            const lineContainer = document.createElement('div');
            lineContainer.style.cssText = `
                display: flex;
                gap: 12px;
                margin-bottom: 8px;
                opacity: 0;
                transform: translateX(-50px);
                transition: all 2.5s ease-out;
                will-change: opacity, transform;
            `;
            
            // Add all words for this line
            currentLine.forEach(word => {
                const wordSpan = document.createElement('span');
                wordSpan.style.cssText = `
                    color: ${word.gold ? '#c9a96e' : '#ffffff'};
                    font-weight: ${word.gold ? '600' : '300'};
                    line-height: 1.2;
                    vertical-align: middle;
                `;
                wordSpan.textContent = word.text;
                lineContainer.appendChild(wordSpan);
            });
            
            // Add line to display
            heroElement.appendChild(lineContainer);
            wordElements.push(lineContainer);
            
            // Trigger fade-in for this line
            setTimeout(() => {
                lineContainer.style.opacity = '1';
                lineContainer.style.transform = 'translateX(0)';
            }, 100);
            
            // Move to next line quickly
            currentLineIndex++;
            setTimeout(() => {
                showAllLines();
            }, 400);
        }
        
        // Start the animation
        startAnimation();
    }
});

// Helicopter Flight Animation
class HelicopterFlightAnimation {
    constructor() {
        this.helicopter = document.querySelector('.helicopter-container');
        this.cloudBack = document.querySelector('.cloud-back');
        this.cloudMid = document.querySelector('.cloud-mid');
        this.cloudFront = document.querySelector('.cloud-front');
        this.mountainLayer = document.querySelector('.mountain-layer');
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        // Start helicopter animation immediately
        setTimeout(() => {
            this.startHelicopterFlight();
        }, 500);
        
        // Add scroll listeners for parallax
        this.setupParallax();
        
        // Add parallax classes
        this.cloudBack.classList.add('parallax-cloud-back');
        this.cloudMid.classList.add('parallax-cloud-mid');
        this.cloudFront.classList.add('parallax-cloud-front');
        this.mountainLayer.classList.add('parallax-mountain');
        this.helicopter.classList.add('parallax-helicopter');
    }
    
    startHelicopterFlight() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        // Initial flight from left to right
        this.helicopter.style.transform = 'translateX(0px)';
        
        setTimeout(() => {
            this.helicopter.style.transform = `translateX(${window.innerWidth + 300}px)`;
        }, 100);
        
        // Reset after animation
        setTimeout(() => {
            this.helicopter.style.transition = 'none';
            this.helicopter.style.transform = 'translateX(-150px)';
            
            setTimeout(() => {
                this.helicopter.style.transition = 'transform 0.3s ease-out';
                this.isAnimating = false;
            }, 100);
        }, 8000);
        
        // Schedule next flight
        setTimeout(() => {
            if (!this.isAnimating) {
                this.startHelicopterFlight();
            }
        }, 15000);
    }
    
    setupParallax() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            // Cloud layers - different speeds for depth
            if (this.cloudBack) {
                const cloudBackY = scrolled * 0.2;
                this.cloudBack.style.transform = `translateY(${cloudBackY}px)`;
            }
            
            if (this.cloudMid) {
                const cloudMidY = scrolled * 0.4;
                this.cloudMid.style.transform = `translateY(${cloudMidY}px)`;
            }
            
            if (this.cloudFront) {
                const cloudFrontY = scrolled * 0.6;
                this.cloudFront.style.transform = `translateY(${cloudFrontY}px)`;
            }
            
            // Mountains - slower movement
            if (this.mountainLayer) {
                const mountainY = scrolled * 0.3;
                this.mountainLayer.style.transform = `translateY(${mountainY}px)`;
            }
            
            // Helicopter - dynamic movement based on scroll
            if (this.helicopter && scrolled > 100) {
                const helicopterX = scrolled * 0.8;
                const helicopterY = scrolled * 0.1;
                const rotation = Math.sin(scrolled * 0.01) * 5;
                
                this.helicopter.style.transform = `
                    translateX(${helicopterX}px) 
                    translateY(${helicopterY}px) 
                    rotate(${rotation}deg)
                `;
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
        
        // Initial parallax position
        updateParallax();
    }
}

// Initialize typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TypingAnimation();
});

// Initialize helicopter animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HelicopterFlightAnimation();
});
