// ===================================
// FRIENDS GYM - JAVASCRIPT
// Modern Fitness Website Functionality
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Navigation Functionality
    // ===================================
    
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky Navigation on Scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Show/hide scroll to top button
        handleScrollTopButton();
        
        // Trigger scroll animations
        handleScrollAnimations();
    });
    
    // Hamburger Menu Toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Scroll to Top Button
    // ===================================
    
    const scrollTopBtn = document.getElementById('scrollTop');
    
    function handleScrollTopButton() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===================================
    // Scroll Animations
    // ===================================
    
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.feature-card, .program-card, .pricing-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in', 'visible');
            }
        });
    }
    
    // Add fade-in class to elements on load
    const animatedElements = document.querySelectorAll('.feature-card, .program-card, .pricing-card, .testimonial-card');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Initial check for animations
    handleScrollAnimations();
    
    // ===================================
    // Active Navigation Link Highlight
    // ===================================
    
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // ===================================
    // Contact Form Handling
    // ===================================
    
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !phone || !email || !message) {
            alert('Please fill in all fields!');
            return;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address!');
            return;
        }
        
        // Phone validation (basic)
        const phonePattern = /^[0-9\-\+\s\(\)]+$/;
        if (!phonePattern.test(phone) || phone.length < 10) {
            alert('Please enter a valid phone number!');
            return;
        }
        
        // Success message
        alert(`Thank you, ${name}! 🏋️\n\nYour message has been received!\n\nWe'll contact you soon at:\n${phone}\n${email}\n\nGet ready to transform your life at Friends Gym!`);
        
        // Reset form
        contactForm.reset();
        
        // Scroll to top with a slight delay
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 500);
    });
    
    // ===================================
    // Dynamic Counter Animation
    // ===================================
    
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        let animated = false;
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            updateCounter();
        };
        
        const checkCounters = () => {
            const aboutSection = document.querySelector('.about');
            if (!aboutSection || animated) return;
            
            const sectionPosition = aboutSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                counters.forEach(counter => animateCounter(counter));
                animated = true;
            }
        };
        
        window.addEventListener('scroll', checkCounters);
        checkCounters(); // Check on load
    }
    
    animateCounters();
    
    // ===================================
    // Hero Section Parallax Effect
    // ===================================
    
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) {
            const scrolled = window.scrollY;
            if (hero && scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }
    });
    
    // ===================================
    // Form Input Focus Effects
    // ===================================
    
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // ===================================
    // Prevent Right Click on Images (Optional)
    // ===================================
    
    // Uncomment if you want to prevent right-click on images
    /*
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault());
    });
    */
    
    // ===================================
    // Loading Animation (Optional Enhancement)
    // ===================================
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            handleScrollAnimations();
        }, 100);
    });
    
    // ===================================
    // Pricing Card Hover Effect Enhancement
    // ===================================
    
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(c => {
                if (c !== this && !c.classList.contains('featured')) {
                    c.style.opacity = '0.6';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            pricingCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
    
    // ===================================
    // Program Cards Click to Expand (Optional)
    // ===================================
    
    const programLinks = document.querySelectorAll('.program-link');
    
    programLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // The href already points to #contact, so smooth scroll will handle it
            // You can add additional custom behavior here if needed
        });
    });
    
    // ===================================
    // Keyboard Navigation Enhancement
    // ===================================
    
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with ESC key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ===================================
    // Add Current Year to Footer
    // ===================================
    
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2024', currentYear);
    }
    
    // ===================================
    // Console Welcome Message
    // ===================================
    
    console.log('%c🏋️ FRIENDS GYM - GOLLAMARI, KHULNA', 'font-size: 20px; font-weight: bold; color: #ff3b3f;');
    console.log('%cWhere Strength Meets Dedication', 'font-size: 14px; color: #ff6b35;');
    console.log('%cWebsite loaded successfully! 💪', 'font-size: 12px; color: #ffffff;');
    
    // ===================================
    // Performance Optimization
    // ===================================
    
    // Debounce function for scroll events
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Apply debounce to scroll handlers for better performance
    window.addEventListener('scroll', debounce(function() {
        highlightActiveSection();
    }, 10));
    
    // ===================================
    // Accessibility Enhancements
    // ===================================
    
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // ===================================
    // Lazy Loading for Images (Optional)
    // ===================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ===================================
    // Social Share Functionality (Optional)
    // ===================================
    
    function shareWebsite(platform) {
        const url = window.location.href;
        const title = 'Friends Gym - Gollamari, Khulna';
        const text = 'Check out Friends Gym - Where Strength Meets Dedication!';
        
        let shareUrl = '';
        
        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }
    
    // Make share function globally available
    window.shareWebsite = shareWebsite;
    
    // ===================================
    // Testimonial Rotation (Optional)
    // ===================================
    
    function rotateTestimonials() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        
        if (window.innerWidth <= 768 && testimonialCards.length > 1) {
            setInterval(() => {
                testimonialCards[currentIndex].style.display = 'none';
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                testimonialCards[currentIndex].style.display = 'block';
            }, 5000);
        }
    }
    
    // Uncomment to enable testimonial rotation on mobile
    // rotateTestimonials();
    
    // ===================================
    // Easter Egg - Konami Code
    // ===================================
    
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        alert('🏋️ BEAST MODE ACTIVATED! 💪\n\nYou found the secret code!\n\nNow get to the gym and unleash your inner beast!');
        document.body.style.animation = 'rainbow 2s linear';
    }
    
    // ===================================
    // End of JavaScript
    // ===================================
    
    // ===================================
    // Gallery Slider Functionality
    // ===================================
    const galleryTrack = document.getElementById('galleryTrack');
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    
    if (galleryTrack && gallerySlides.length > 0 && galleryPrev && galleryNext) {
        let galleryIndex = 0;
        let slidesPerView = 3; // Default: show 3 images at a time
        
        // Calculate slides per view based on screen size
        function calculateSlidesPerView() {
            const width = window.innerWidth;
            if (width <= 600) {
                slidesPerView = 1;
            } else if (width <= 900) {
                slidesPerView = 2;
            } else {
                slidesPerView = 3;
            }
        }
        
        function updateGallerySlider() {
            calculateSlidesPerView();
            
            if (gallerySlides.length > 0) {
                const slideWidth = gallerySlides[0].offsetWidth;
                const gap = 20; // Gap between slides
                const moveDistance = (slideWidth + gap) * galleryIndex;
                
                galleryTrack.style.transform = `translateX(-${moveDistance}px)`;
                galleryTrack.style.transition = 'transform 0.5s ease-in-out';
                
                // Disable buttons at boundaries
                const maxIndex = Math.max(0, gallerySlides.length - slidesPerView);
                galleryPrev.disabled = galleryIndex === 0;
                galleryNext.disabled = galleryIndex >= maxIndex;
                
                // Add/remove disabled styling
                if (galleryIndex === 0) {
                    galleryPrev.style.opacity = '0.3';
                    galleryPrev.style.cursor = 'not-allowed';
                } else {
                    galleryPrev.style.opacity = '1';
                    galleryPrev.style.cursor = 'pointer';
                }
                
                if (galleryIndex >= maxIndex) {
                    galleryNext.style.opacity = '0.3';
                    galleryNext.style.cursor = 'not-allowed';
                } else {
                    galleryNext.style.opacity = '1';
                    galleryNext.style.cursor = 'pointer';
                }
            }
        }
        
        galleryPrev.addEventListener('click', function() {
            if (galleryIndex > 0) {
                galleryIndex--;
                updateGallerySlider();
            }
        });
        
        galleryNext.addEventListener('click', function() {
            const maxIndex = Math.max(0, gallerySlides.length - slidesPerView);
            if (galleryIndex < maxIndex) {
                galleryIndex++;
                updateGallerySlider();
            }
        });
        
        // Responsive: update slider on window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                galleryIndex = 0; // Reset to first slide on resize
                updateGallerySlider();
            }, 250);
        });
        
        // Initialize gallery slider
        calculateSlidesPerView();
        updateGallerySlider();
        
        // Auto-play gallery (optional)
        let autoPlayInterval;
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                const maxIndex = Math.max(0, gallerySlides.length - slidesPerView);
                if (galleryIndex < maxIndex) {
                    galleryIndex++;
                } else {
                    galleryIndex = 0;
                }
                updateGallerySlider();
            }, 4000); // Change slide every 4 seconds
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        // Start auto-play
        startAutoPlay();
        
        // Pause auto-play on hover
        const gallerySection = document.querySelector('.gallery-slider');
        if (gallerySection) {
            gallerySection.addEventListener('mouseenter', stopAutoPlay);
            gallerySection.addEventListener('mouseleave', startAutoPlay);
        }
        
        // Keyboard navigation for gallery
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                galleryPrev.click();
            } else if (e.key === 'ArrowRight') {
                galleryNext.click();
            }
        });
        
        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (gallerySection) {
            gallerySection.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            gallerySection.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next
                galleryNext.click();
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous
                galleryPrev.click();
            }
        }
        
        console.log(`✅ Gallery initialized with ${gallerySlides.length} images`);
    } else {
        console.warn('⚠️ Gallery elements not found. Check your HTML structure.');
    }
});

// ===================================
// Service Worker Registration (Optional - for PWA)
// ===================================

/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
}
*/