// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.8rem 5%';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.7)';
    } else {
        navbar.style.padding = '1.2rem 5%';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Coffee Cup Testimonials
const reviewBubbles = document.querySelectorAll('.review-bubble');
const reviewDots = document.querySelectorAll('.review-dot');

let currentReview = 0;

function showReview(index) {
    reviewBubbles.forEach(bubble => bubble.classList.remove('active'));
    reviewDots.forEach(dot => dot.classList.remove('active'));
    reviewBubbles[index].classList.add('active');
    reviewDots[index].classList.add('active');
}

function nextReview() {
    currentReview = (currentReview + 1) % reviewBubbles.length;
    showReview(currentReview);
}

function prevReview() {
    currentReview = (currentReview - 1 + reviewBubbles.length) % reviewBubbles.length;
    showReview(currentReview);
}

// Dot controls
reviewDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentReview = index;
        showReview(currentReview);
    });
});

// Auto-advance reviews
let autoReviewInterval = setInterval(nextReview, 5000);

// Pause auto-advance on hover
const coffeeTestimonials = document.querySelector('.coffee-testimonials');

if (coffeeTestimonials) {
    coffeeTestimonials.addEventListener('mouseenter', () => {
        clearInterval(autoReviewInterval);
    });

    coffeeTestimonials.addEventListener('mouseleave', () => {
        autoReviewInterval = setInterval(nextReview, 5000);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.service-badge, .info-card, .highlight-box').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    animateOnScroll.observe(element);
});

// Parallax effect for floating cards
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        if (scrolled < window.innerHeight) {
            card.style.transform = `translateY(${yPos}px)`;
        }
    });
});

// Add hover effect to menu flip cards
const flipCards = document.querySelectorAll('.menu-flip-card');

flipCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '1';
    });
});

// Coffee cup animation on scroll
const coffeeCup = document.querySelector('.coffee-cup');
if (coffeeCup) {
    window.addEventListener('scroll', () => {
        const testimonialsSection = document.querySelector('.testimonials-section');
        if (testimonialsSection) {
            const rect = testimonialsSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrollPercent = Math.min(100, Math.max(0, 
                    ((window.innerHeight - rect.top) / window.innerHeight) * 100
                ));
                coffeeCup.style.opacity = scrollPercent / 100;
            }
        }
    });
}
