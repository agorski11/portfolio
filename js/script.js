// ==============================================
// COMPREHENSIVE PORTFOLIO ENHANCEMENTS
// ==============================================

// Master enhancement initialization function
function applyAllEnhancements() {
    // UI & Navigation Enhancements
    addReadingProgressBar();
    addNavigationDots();
    addThemeSwitcher();
    applyParticleBackground();
    enhanceScrollBehavior();
    
    // Interactive Elements
    enhanceFormExperience();
    enhanceMicroInteractions();
    createMagneticElements();
    makeSkillBarsInteractive();
    
    // Content Enhancements
    createAnimatedTimeline();
    createTestimonialSlider();
    addQuickDashboard();
    
    // Technical Improvements
    setupLazyLoading();
    addScrollAnimations();
    setupPageTransitions();
    addSkeletonLoaders();
    
    // Social & Miscellaneous
    setupSocialFeatures();
    addEasterEggs();
}

// ==============================================
// UI & NAVIGATION ENHANCEMENTS
// ==============================================

// Reading progress bar at top of screen
function addReadingProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollProgress + '%';
    });
}

// Floating navigation dots for side navigation
function addNavigationDots() {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;
    
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'nav-dots';
    
    sections.forEach(section => {
        const dot = document.createElement('a');
        dot.href = `#${section.id}`;
        dot.dataset.section = section.id;
        dot.innerHTML = `<span class="dot-tooltip">${section.id.charAt(0).toUpperCase() + section.id.slice(1)}</span>`;
        dotsContainer.appendChild(dot);
    });
    
    document.body.appendChild(dotsContainer);
    
    function updateActiveDot() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                currentSection = section.id;
            }
        });
        
        document.querySelectorAll('.nav-dots a').forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.section === currentSection) {
                dot.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveDot);
    updateActiveDot(); // Initialize
}

// Add theme switcher (light/dark mode toggle)
function addThemeSwitcher() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = `
        <input type="checkbox" id="theme-switch">
        <label for="theme-switch" class="toggle-label">
            <i class="fas fa-sun"></i>
            <i class="fas fa-moon"></i>
            <span class="toggle-ball"></span>
        </label>
    `;
    
    // Insert before hamburger menu
    const hamburger = nav.querySelector('.hamburger');
    if (hamburger) {
        nav.insertBefore(themeToggle, hamburger);
    } else {
        nav.appendChild(themeToggle);
    }
    
    // Initialize based on system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        themeSwitch.checked = prefersDarkMode;
        document.body.classList.toggle('dark-mode', prefersDarkMode);
        
        themeSwitch.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            // Add animation for transition
            document.body.classList.add('theme-transition');
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 1000);
        });
    }
}

// Apply particle background to hero section
function applyParticleBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    hero.appendChild(particleContainer);
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation delay and duration
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        particleContainer.appendChild(particle);
    }
}

// Enhanced scroll behavior
function enhanceScrollBehavior() {
    // Smoother scroll
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without causing page jump
                history.pushState(null, null, href);
            }
        });
    });
    
    // "Back to top" button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==============================================
// INTERACTIVE ELEMENTS
// ==============================================

// Enhanced form with floating labels
function enhanceFormExperience() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Add modern form styling
    const formGroups = contactForm.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (!input) return;
        
        // Create floating label
        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = input.placeholder;
        input.placeholder = '';
        
        group.insertBefore(label, input);
        
        if (input.value) {
            group.classList.add('active');
        }
        
        input.addEventListener('focus', () => {
            group.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                group.classList.remove('active');
            }
        });
    });
    
    // Enhance form submission feedback
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (!submitBtn) return;
        
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner"></span>Sending...';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'form-message success-message';
            messageDiv.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
            contactForm.appendChild(messageDiv);
            
            setTimeout(() => messageDiv.classList.add('visible'), 10);
            
            // Reset form
            contactForm.reset();
            formGroups.forEach(group => group.classList.remove('active'));
            
            // Reset button
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.classList.remove('success');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 3000);
            
            // Remove message after delay
            setTimeout(() => {
                messageDiv.classList.remove('visible');
                setTimeout(() => messageDiv.remove(), 300);
            }, 5000);
        }, 1500);
    });
}

// Add button micro-interactions
function enhanceMicroInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    // Magnetic effect
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const intensity = 0.1;
            this.style.transform = `translate(${x * intensity}px, ${y * intensity}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Ripple effect
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Enhance social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Create magnetic elements (projects, skills, etc)
function createMagneticElements() {
    const magneticElements = document.querySelectorAll('.project-card, .skill-item');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const intensity = 0.05;
            this.style.transform = `translate(${x * intensity}px, ${y * intensity}px) scale(1.02)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Make skill bars interactive
function makeSkillBarsInteractive() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const skillLevel = bar.querySelector('.skill-level');
        
        if (!skillLevel) return;
        
        bar.addEventListener('mousemove', e => {
            const rect = bar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
            
            const currentPercent = parseInt(skillLevel.style.width);
            
            if (percentage <= currentPercent) {
                skillLevel.style.setProperty('--hover-position', `${percentage}%`);
                skillLevel.classList.add('hover-effect');
            } else {
                skillLevel.classList.remove('hover-effect');
            }
        });
        
        bar.addEventListener('mouseleave', () => {
            skillLevel.classList.remove('hover-effect');
        });
    });
}

// ==============================================
// CONTENT ENHANCEMENTS
// ==============================================

// Create animated timeline in About section
function createAnimatedTimeline() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    const aboutContent = aboutSection.querySelector('.about-content');
    if (!aboutContent) return;
    
    // Create timeline section
    const timelineSection = document.createElement('div');
    timelineSection.className = 'timeline-section';
    
    
    aboutContent.appendChild(timelineSection);
    
    // Add animation to timeline items
    function animateTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 200);
                        observer.unobserve(item);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(item);
        });
    }
    
    // Call animation setup
    animateTimelineItems();
}

/**
 * Create testimonial slider functionality
 */
function createTestimonialSlider() {
    const testimonialSection = document.querySelector('.testimonials-section');
    
    // Exit if testimonials section doesn't exist
    if (!testimonialSection) {
        console.log("Testimonials section not found");
        return;
    }
    
    const testimonials = testimonialSection.querySelectorAll('.testimonial-card');
    
    // Exit if no testimonial cards found
    if (!testimonials.length) {
        console.log("No testimonial cards found");
        return;
    }
    
    // Create slider container if it doesn't exist
    let sliderContainer = testimonialSection.querySelector('.testimonial-slider');
    if (!sliderContainer) {
        sliderContainer = document.createElement('div');
        sliderContainer.className = 'testimonial-slider';
        
        // Find where to insert the slider container
        const sectionTitle = testimonialSection.querySelector('.section-header');
        
        // Make sure we insert after the section header, or at the beginning if no header
        if (sectionTitle && sectionTitle.parentNode === testimonialSection) {
            testimonialSection.insertBefore(sliderContainer, sectionTitle.nextSibling);
        } else {
            // Insert at the beginning of the section
            testimonialSection.insertBefore(sliderContainer, testimonialSection.firstChild);
        }
    }
    
    // Clear the slider container
    sliderContainer.innerHTML = '';
    
    // Add testimonials to slider
    testimonials.forEach(testimonial => {
        // Only move if not already in slider
        if (testimonial.parentNode !== sliderContainer) {
            // Clone the testimonial to avoid DOM manipulation issues
            const testimonialClone = testimonial.cloneNode(true);
            sliderContainer.appendChild(testimonialClone);
            
            // Hide the original if needed
            if (testimonial.parentNode === testimonialSection) {
                testimonial.style.display = 'none';
            }
        }
    });
    
    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'testimonial-nav prev-btn';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.setAttribute('aria-label', 'Previous testimonial');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'testimonial-nav next-btn';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.setAttribute('aria-label', 'Next testimonial');
    
    // Only append buttons if they don't already exist
    if (!testimonialSection.querySelector('.prev-btn')) {
        sliderContainer.appendChild(prevButton);
    }
    
    if (!testimonialSection.querySelector('.next-btn')) {
        sliderContainer.appendChild(nextButton);
    }
    
    // Set up slider functionality
    let currentSlide = 0;
    const slideCount = sliderContainer.querySelectorAll('.testimonial-card').length;
    
    // Don't set up slider if no slides
    if (slideCount === 0) {
        console.log("No testimonial slides found");
        return;
    }
    
    function showSlide(index) {
        const slides = sliderContainer.querySelectorAll('.testimonial-card');
        
        // Hide all slides
        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.transform = 'translateX(20px)';
            slide.style.display = 'none';
        });
        
        // Show current slide
        if (slides[index]) {
            slides[index].style.display = 'block';
            setTimeout(() => {
                slides[index].style.opacity = '1';
                slides[index].style.transform = 'translateX(0)';
            }, 10);
        }
    }
    
    // Initialize first slide
    showSlide(currentSlide);
    
    // Set up button click handlers
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
    });
    
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    });
    
    // Auto-advance slides
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }, 5000);
    
    // Pause auto-advance on hover
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            showSlide(currentSlide);
        }, 5000);
    });
    
    console.log("Testimonial slider created successfully");
}

// Add quick stats dashboard
function addQuickDashboard() {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;
    
    const dashboardSection = document.createElement('div');
    dashboardSection.className = 'quick-dashboard';
    dashboardSection.innerHTML = `
        <div class="dashboard-item">
            <div class="dashboard-icon">
                <i class="fas fa-briefcase"></i>
            </div>
            <div class="dashboard-count" data-count="15">0</div>
            <div class="dashboard-label">Projects Completed</div>
        </div>
        <div class="dashboard-item">
            <div class="dashboard-icon">
                <i class="fas fa-clock"></i>
            </div>
            <div class="dashboard-count" data-count="5">0</div>
            <div class="dashboard-label">Years Experience</div>
        </div>
        <div class="dashboard-item">
            <div class="dashboard-icon">
                <i class="fas fa-coffee"></i>
            </div>
            <div class="dashboard-count" data-count="1240">0</div>
            <div class="dashboard-label">Coffee Cups</div>
        </div>
        <div class="dashboard-item">
            <div class="dashboard-icon">
                <i class="fas fa-smile"></i>
            </div>
            <div class="dashboard-count" data-count="32">0</div>
            <div class="dashboard-label">Satisfied Clients</div>
        </div>
    `;
    
    // Insert at beginning of skills section
    skillsSection.insertBefore(dashboardSection, skillsSection.querySelector('.container'));
    
    // Animate numbers when in view
    function animateDashboardCounts() {
        const dashboardItems = document.querySelectorAll('.dashboard-count');
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const countElement = entry.target;
                    const targetCount = parseInt(countElement.getAttribute('data-count'));
                    let currentCount = 0;
                    
                    const duration = 2000;
                    const interval = 30;
                    const increment = Math.ceil(targetCount / (duration / interval));
                    
                    const timer = setInterval(() => {
                        currentCount += increment;
                        
                        if (currentCount > targetCount) {
                            currentCount = targetCount;
                            clearInterval(timer);
                        }
                        
                        countElement.textContent = currentCount;
                    }, interval);
                    
                    observer.unobserve(countElement);
                }
            });
        }, { threshold: 0.5 });
        
        dashboardItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // Call animation function
    animateDashboardCounts();
}

// ==============================================
// TECHNICAL IMPROVEMENTS
// ==============================================

// Setup lazy loading for images
function setupLazyLoading() {
    const imgPlaceholders = document.querySelectorAll('.img-placeholder');
    
    imgPlaceholders.forEach((placeholder, index) => {
        // Add loading animation
        placeholder.classList.add('loading');
        
        // Simulate image loading (replace with actual image loading)
        setTimeout(() => {
            placeholder.classList.remove('loading');
            placeholder.classList.add('loaded');
        }, 1000 + (index * 300));
    });
}

// Add scroll-activated animations
function addScrollAnimations() {
    const elements = document.querySelectorAll('.project-card, .skill-item, .contact-card, h2.section-title, .about-text p, .about-text h3');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Setup page transitions
function setupPageTransitions() {
    // Create page transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition-overlay';
    document.body.appendChild(transitionOverlay);
    
    // Add leave animation to links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only if it's opening in same tab
            if (!this.target || this.target !== '_blank') {
                e.preventDefault();
                
                transitionOverlay.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 600);
            }
        });
    });
    
    // Page entry animation
    window.addEventListener('pageshow', () => {
        transitionOverlay.classList.remove('active');
    });
}

// Add skeleton loaders
function addSkeletonLoaders() {
    // Add skeleton loader to project list
    const projectsSection = document.querySelector('#projects');
    if (!projectsSection) return;
    
    // Create skeleton loader styles
    const skeletonStyle = document.createElement('style');
    skeletonStyle.textContent = `
        @keyframes skeletonPulse {
            0% { opacity: 0.6; }
            50% { opacity: 0.8; }
            100% { opacity: 0.6; }
        }
        
        .skeleton {
            background: linear-gradient(90deg, #f0f0f0, #f8f8f8, #f0f0f0);
            background-size: 200% 100%;
            animation: skeletonPulse 1.5s ease-in-out infinite;
        }
        
        .dark-mode .skeleton {
            background: linear-gradient(90deg, #2a2a2a, #3a3a3a, #2a2a2a);
            background-size: 200% 100%;
        }
    `;
    
    document.head.appendChild(skeletonStyle);
}

// ==============================================
// SOCIAL & MISCELLANEOUS FEATURES
// ==============================================

// Setup social media features
function setupSocialFeatures() {
    // Add "Share this portfolio" feature
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    const shareContainer = document.createElement('div');
    shareContainer.className = 'share-container';
    shareContainer.innerHTML = `
        <div class="share-label">Share this portfolio:</div>
        <div class="share-buttons">
            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out this amazing portfolio!" target="_blank" class="share-button twitter">
                <i class="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-button linkedin">
                <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="mailto:?subject=Check out this portfolio&body=${encodeURIComponent(window.location.href)}" class="share-button email">
                <i class="fas fa-envelope"></i>
            </a>
            <button class="share-button copy" data-clipboard-text="${window.location.href}">
                <i class="fas fa-link"></i>
            </button>
        </div>
    `;
    
    const footerContent = footer.querySelector('.footer-content');
    if (footerContent) {
        footerContent.appendChild(shareContainer);
    }
    
    // Copy URL functionality
    const copyButton = document.querySelector('.share-button.copy');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const text = this.getAttribute('data-clipboard-text');
            navigator.clipboard.writeText(text).then(() => {
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.classList.add('copied');
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.classList.remove('copied');
                }, 2000);
            });
        });
    }
}

// Add fun easter eggs
function addEasterEggs() {
    // Konami code easter egg
    let keys = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    window.addEventListener('keydown', (e) => {
        keys.push(e.key);
        keys = keys.slice(-konamiCode.length);
        
        if (keys.join('') === konamiCode.join('')) {
            // Trigger easter egg
            document.body.classList.add('konami-activated');
            
            // Create fireworks
            for (let i = 0; i < 20; i++) {
                createFirework();
            }
            
            setTimeout(() => {
                document.body.classList.remove('konami-activated');
            }, 5000);
        }
    });
    
    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        // Random position
        firework.style.left = `${Math.random() * 100}vw`;
        firework.style.top = `${50 + Math.random() * 50}vh`;
        
        // Random colors
        const hue = Math.floor(Math.random() * 360);
        firework.style.backgroundColor = `hsl(${hue}, 100%, 60%)`;
        
        document.body.appendChild(firework);
        
        setTimeout(() => {
            firework.remove();
        }, 1000);
    }
}

// ==============================================
// CSS STYLES FOR ENHANCEMENTS
// ==============================================

// Add all CSS styles for the new components
function addEnhancementStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* ===== Navigation & UI Enhancements ===== */
        
        /* Reading Progress Bar */
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            z-index: 9999;
            transition: width 0.1s;
        }
        
        /* Navigation Dots */
        .nav-dots {
            position: fixed;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 15px;
            z-index: 100;
        }
        
        .nav-dots a {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(100, 116, 139, 0.3);
            transition: var(--transition-smooth);
            position: relative;
        }
        
        .nav-dots a.active {
            background: var(--primary-color);
            transform: scale(1.3);
        }
        
        .nav-dots a:hover {
            background: var(--primary-color);
            transform: scale(1.3);
        }
        
        .dot-tooltip {
            position: absolute;
            right: 25px;
            top: 50%;
            transform: translateY(-50%);
            background: var(--glass-bg);
            backdrop-filter: var(--glass-blur);
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 0.75rem;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: var(--transition-smooth);
        }
        
        .nav-dots a:hover .dot-tooltip {
            opacity: 1;
            visibility: visible;
            right: 30px;
        }
        
        /* Theme Switcher */
        .theme-toggle {
            display: flex;
            align-items: center;
            margin-right: 20px;
        }
        
        .theme-toggle input {
            display: none;
        }
        
        .toggle-label {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 60px;
            height: 30px;
            border-radius: 30px;
            background: var(--glass-bg);
            backdrop-filter: var(--glass-blur);
            border: var(--glass-border);
            cursor: pointer;
            padding: 0 5px;
            overflow: hidden;
        }
        
        .toggle-ball {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: var(--primary-color);
            transition: transform 0.3s ease;
        }
        
        #theme-switch:checked + .toggle-label .toggle-ball {
            transform: translateX(30px);
        }
        
        .toggle-label .fa-sun {
            color: #f59e0b;
        }
        
        .toggle-label .fa-moon {
            color: #6366f1;
        }
        
        /* Dark Mode */
        .dark-mode {
            --bg-color: #0f172a;
            --alt-bg-color: #1e293b;
            --dark-color: #f8fafc;
            --mid-color: #94a3b8;
            --light-color: #334155;
            --glass-bg: rgba(30, 41, 59, 0.7);
            --glass-border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .theme-transition {
            transition: background-color 0.5s ease, color 0.5s ease;
        }
        
        /* Particles */
        .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
        }
        
        .particle {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-light), var(--primary-dark));
            opacity: 0.3;
            animation: float 10s linear infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
            }
            25% {
                transform: translateY(-30px) translateX(30px) rotate(90deg);
            }
            50% {
                transform: translateY(-60px) translateX(0) rotate(180deg);
            }
            75% {
                transform: translateY(-30px) translateX(-30px) rotate(270deg);
            }
            100% {
                transform: translateY(0) translateX(0) rotate(360deg);
            }
        }
        
        /* Back to top button */
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--glass-bg);
            backdrop-filter: var(--glass-blur);
            border: var(--glass-border);
            color: var(--primary-color);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: var(--shadow-md);
            transition: var(--transition-smooth);
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            z-index: 100;
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .back-to-top:hover {
            background: var(--primary-color);
            color: white;
            transform: translateY(-5px);
        }
        
        /* ===== Interactive Elements ===== */
        
        /* Enhanced Form */
        .form-group {
            position: relative;
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            position: absolute;
            top: 1rem;
            left: 1.2rem;
            color: var(--mid-color);
            transition: var(--transition-smooth);
            pointer-events: none;
            font-size: 1rem;
            background: var(--bg-color);
            padding: 0 0.5rem;
            opacity: 0;
            transform: translateY(0);
        }
        
        .form-group.active label {
            opacity: 1;
            top: -0.5rem;
            left: 0.8rem;
            font-size: 0.8rem;
            color: var(--primary-color);
            transform: translateY(0);
        }
        
        .form-group input,
        .form-group textarea {
            font-family: var(--font-primary);
            font-size: 1rem;
            padding: 1rem 1.2rem;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: var(--glass-blur);
            border: 1px solid rgba(67, 97, 238, 0.1);
            border-radius: var(--border-radius-md);
            transition: all 0.3s ease;
            width: 100%;
            color: var(--dark-color);
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            background: white;
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
            transform: translateY(-2px);
            outline: none;
        }
        
        /* Submit button loading state */
        .btn.loading {
            background: var(--mid-color);
            pointer-events: none;
        }
        
        .btn.success {
            background: var(--success-color);
            pointer-events: none;
        }
        
        .btn .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid transparent;
            border-top-color: white;
            border-radius: 50%;
            animation: spinner 0.6s linear infinite;
            margin-right: 8px;
        }
        
        @keyframes spinner {
            to { transform: rotate(360deg); }
        }
        
        /* Form message styling */
        .form-message {
            padding: 0.8rem;
            border-radius: 8px;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            opacity: 0;
            transform: translateY(-10px);
            transition: var(--transition-smooth);
        }
        
        .form-message.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .success-message {
            background-color: rgba(16, 185, 129, 0.1);
            color: var(--success-color);
        }
        
        /* Button Ripple Effect */
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple-effect {
            position: absolute;
            width: 100px;
            height: 100px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Skill Bar Hover Effect */
        .skill-level {
            position: relative;
            overflow: hidden;
        }
        
        .skill-level.hover-effect::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 40px;
            height: 100%;
            background: linear-gradient(90deg, 
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.6) 50%,
                rgba(255, 255, 255, 0) 100%
            );
            transform: translateX(var(--hover-position));
            pointer-events: none;
        }
        
        /* ===== Content Enhancements ===== */
        
        /* Animated Timeline */
        .timeline-section {
            margin-top: 3rem;
        }
        
        .timeline {
            position: relative;
            padding: 2rem 0;
            max-width: 100%;
            margin: 0 auto;
        }
        
        .timeline::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(to bottom, 
                var(--primary-light) 0%,
                var(--primary-color) 50%,
                var(--primary-dark) 100%
            );
        }
        
        .timeline-item {
            position: relative;
            padding-left: 2.5rem;
            margin-bottom: 2rem;
            opacity: 0;
            transform: translateX(-20px);
            transition: var(--transition-smooth);
        }
        
        .timeline-item.animate {
            opacity: 1;
            transform: translateX(0);
        }
        
        .timeline-dot {
            position: absolute;
            top: 0;
            left: -6px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: var(--primary-color);
            border: 2px solid var(--bg-color);
        }
        
        .timeline-content {
            padding: 1.5rem;
            background: var(--glass-bg);
            backdrop-filter: var(--glass-blur);
            border: var(--glass-border);
            border-radius: var(--border-radius-md);
            box-shadow: var(--shadow-md);
        }
        
        .timeline-date {
            display: inline-block;
            padding: 0.3rem 0.8rem;
            background: var(--primary-color);
            color: white;
            border-radius: 20px;
            margin-bottom: 0.5rem;
            font-size: 0.8rem;
        }
        
        /* Testimonial Slider */
        .testimonial-section {
            margin-bottom: 3rem;
        }
        
        .testimonial-slider {
            position: relative;
            overflow: hidden;
            margin-top: 2rem;
            background: var(--glass-bg);
            backdrop-filter: var(--glass-blur);
            border: var(--glass-border);
            border-radius: var(--border-radius-md);
            box-shadow: var(--shadow-md);
            padding-bottom: 3rem;
        }
        
        .testimonial-track {
            display: flex;
            transition: transform 0.5s ease;
            width: 300%;
        }
        
        .testimonial-slide {
            flex: 1;
            min-width: 33.333%;
        }
        
        .testimonial-content {
            padding: 2rem;
        }
        
        .testimonial-quote {
            margin-bottom: 1.5rem;
        }
        
        .testimonial-quote i {
            font-size: 1.5rem;
            color: var(--primary-light);
            margin-bottom: 0.5rem;
            display: block;
        }
        
        .testimonial-author {
            display: flex;
            align-items: center;
        }
        
        .author-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-light);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            margin-right: 1rem;
        }
        
        .author-avatar i {
            font-size: 1.5rem;
        }
        
        .author-info h4 {
            margin: 0;
            font-size: 1rem;
        }
        
        .author-info p {
            margin: 0;
            font-size: 0.8rem;
            color: var(--mid-color);
        }
        
        .testimonial-nav {
            position: absolute;
            bottom: 1rem;
            left: 0;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
        }
        
        .testimonial-prev,
        .testimonial-next {
            background: none;
            border: none;
            color: var(--primary-color);
            font-size: 1rem;
            cursor: pointer;
            transition: var(--transition-smooth);
        }
        
        .testimonial-prev:hover,
        .testimonial-next:hover {
            color: var(--primary-dark);
            transform: scale(1.2);
        }
        
        .testimonial-dots {
            display: flex;
            gap: 0.5rem;
        }
        
        .testimonial-dots .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--mid-color);
            opacity: 0.5;
            cursor: pointer;
            transition: var(--transition-smooth);
        }
        
        .testimonial-dots .dot.active {
            background: var(--primary-color);
            opacity: 1;
            transform: scale(1.2);
        }
        
        /* Dashboard Stats */
        .quick-dashboard {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 1rem;
            max-width: var(--content-width);
            margin: 0 auto 3rem;
            padding: 1rem;
        }
        
        .dashboard-item {
            flex: 1;
            min-width: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            background: var(--glass-bg);
            backdrop-filter: var(--glass-blur);
            border: var(--glass-border);
            border-radius: var(--border-radius-md);
            box-shadow: var(--shadow-md);
            transition: var(--transition-smooth);
        }
        
        .dashboard-item:hover {
            transform: translateY(-10px);
            box-shadow: var(--shadow-lg);
        }
        
        .dashboard-icon {
            font-size: 2rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        
        .dashboard-count {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--dark-color);
            margin-bottom: 0.5rem;
        }
        
        .dashboard-label {
            color: var(--mid-color);
            text-align: center;
        }
        
        /* ===== Technical Improvements ===== */
        
        /* Lazy Loading Placeholder */
        .img-placeholder.loading {
            background: linear-gradient(90deg, var(--alt-bg-color), var(--bg-color), var(--alt-bg-color));
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        
        /* Animated Elements */
        .project-card,
        .skill-item,
        .contact-card,
        h2.section-title,
        .about-text p,
        .about-text h3 {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .project-card.animated,
        .skill-item.animated,
        .contact-card.animated,
        h2.section-title.animated,
        .about-text p.animated,
        .about-text h3.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Page Transitions */
        .page-transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-color);
            z-index: 9999;
            transform: translateY(100%);
            transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
            pointer-events: none;
        }
        
        .page-transition-overlay.active {
            transform: translateY(0);
        }
        
        /* ===== Social Features ===== */
        
        /* Share Container */
        .share-container {
            margin-top: 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .share-label {
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            color: var(--mid-color);
        }
        
        .share-buttons {
            display: flex;
            gap: 0.5rem;
        }
        
        .share-button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            border: none;
            cursor: pointer;
            transition: var(--transition-smooth);
            font-size: 1rem;
        }
        
        .share-button:hover {
            transform: translateY(-5px);
        }
        
        .share-button.twitter {
            background: #1DA1F2;
        }
        
        .share-button.linkedin {
            background: #0077B5;
        }
        
        .share-button.email {
            background: #EA4335;
        }
        
        .share-button.copy {
            background: var(--dark-color);
        }
        
        .share-button.copied {
            background: var(--success-color);
        }
        
        /* Easter Eggs */
        .konami-activated {
            overflow: hidden;
        }
        
        .firework {
            position: fixed;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            animation: explode 1s forwards;
            z-index: 9999;
        }
        
        @keyframes explode {
            0% {
                transform: scale(0.1);
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: scale(20);
                opacity: 0;
            }
        }
        
        /* ===== Media Queries ===== */
        
        @media (max-width: 992px) {
            .quick-dashboard {
                padding: 1rem;
            }
            
            .dashboard-item {
                min-width: 150px;
                padding: 1.5rem;
            }
            
            .timeline::before {
                left: 20px;
            }
            
            .timeline-item {
                padding-left: 3rem;
            }
            
            .timeline-dot {
                left: 14px;
            }
            
            .nav-dots {
                right: 10px;
            }
        }
        
        @media (max-width: 768px) {
            .testimonial-content {
                padding: 1.5rem;
            }
            
            .timeline-content {
                padding: 1rem;
            }
            
            .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
            }
            
            .theme-toggle {
                margin-right: 10px;
            }
            
            .toggle-label {
                width: 50px;
                height: 26px;
            }
            
            #theme-switch:checked + .toggle-label .toggle-ball {
                transform: translateX(24px);
            }
        }
        
        @media (max-width: 576px) {
            .dashboard-item {
                min-width: 100%;
            }
            
            .nav-dots {
                display: none;
            }
            
            .theme-toggle {
                margin-right: 5px;
            }
        }
        
        /* Enhanced visual styles */
        .section {
            position: relative;
            overflow: hidden;
        }
        
        .section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: var(--gradient-primary);
            opacity: 0.7;
            transform: translateY(-5px);
            transition: transform 0.3s ease;
        }
        
        .section:hover::before {
            transform: translateY(0);
        }
        
        /* Enhance buttons */
        .btn {
            position: relative;
            overflow: hidden;
            z-index: 1;
        }
        
        .btn::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            transition: all 0.4s ease;
            z-index: -1;
        }
        
        .btn:hover::after {
            left: 0;
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Adds animation styles for name elements in the portfolio
 */
function addNameAnimationStyles() {
    // Create a style element for the animations
    const styleEl = document.createElement('style');
    
    // Define the animation CSS
    styleEl.textContent = `
        /* Gradient animation for name */
        @keyframes gradientName {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .name-highlight {
            background: linear-gradient(90deg, var(--primary-color), var(--primary-light), var(--primary-dark));
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: gradientName 5s ease infinite;
        }
    `;
    
    // Add the style element to the document head
    document.head.appendChild(styleEl);
    
    // Find the hero heading and apply the highlight effect to the name
    const heroHeading = document.querySelector('.hero-content h1');
    if (heroHeading && !heroHeading.querySelector('.name-highlight')) {
        // Assume the first word is the name
        const text = heroHeading.textContent;
        const words = text.split(' ');
        
        if (words.length > 0) {
            // Wrap first word (name) in a span with the highlight class
            words[0] = `<span class="name-highlight">${words[0]}</span>`;
            heroHeading.innerHTML = words.join(' ');
        }
    }
    
    console.log("Name animation styles applied");
}

// ==============================================
// INITIALIZATION
// ==============================================

// Updated initialization function to include all enhancements
function initializePortfolio() {
    // Add all styles
    addCustomStyles();
    addNameAnimationStyles();
    addEnhancementStyles();
    
    // Setup standard features
    setupTypingEffect();
    setupProjectFiltering();
    setupSmoothScrolling();
    setupContactForm();
    setupSkillAnimations();
    setupInteractiveSkills();
    
    // Add name animation
    animateNameReveal();
    
    // Apply all enhancement features
    applyAllEnhancements();
    
    // Add scroll event listeners
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('scroll', animateSkillBars);
    
    // Call once on load
    revealOnScroll();
    animateSkillBars();
    
    // Trigger animation if skills section is already in view on page load
    setTimeout(() => {
        animateSkillBars();
    }, 500);
}

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePortfolio);

// Add this function to the script.js file
function addCustomStyles() {
    // Create a style element
    const styleEl = document.createElement('style');
    
    // Add custom styles for better project card animations and transitions
    const customCSS = `
        /* Enhanced transitions for project cards */
        .project-card {
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                        box-shadow 0.4s ease,
                        opacity 0.4s ease;
        }
        
        /* Better focus styles for accessibility */
        .project-link:focus, 
        .filter-btn:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
        
        /* Improved hover effects for filter buttons */
        .filter-btn:hover {
            background-color: rgba(99, 102, 241, 0.1);
        }
        
        /* Add subtle animation to project icons */
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .project-icon-large {
            animation: pulse 3s ease-in-out infinite;
        }
    `;
    
    // Set the CSS content
    styleEl.textContent = customCSS;
    
    // Append to the head
    document.head.appendChild(styleEl);
    
    console.log("Custom styles added");
}

/**
 * Set up project filtering functionality
 */
function setupProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length || !projectCards.length) {
        console.log("Project filtering elements not found");
        return;
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    if (card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    console.log("Project filtering setup complete");
}

/**
 * Set up smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navbarMenu = document.querySelector('.nav-links');
                const hamburger = document.querySelector('.hamburger');
                
                if (navbarMenu && navbarMenu.classList.contains('active')) {
                    navbarMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                // Scroll to the target
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log("Smooth scrolling setup complete");
}

/**
 * Set up contact form validation and handling
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.log("Contact form not found");
        return;
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        let isValid = true;
        const name = contactForm.querySelector('#name');
        const email = contactForm.querySelector('#email');
        const message = contactForm.querySelector('#message');
        
        // Clear previous error messages
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        // Validate name
        if (!name.value.trim()) {
            isValid = false;
            addErrorMessage(name, 'Please enter your name');
        }
        
        // Validate email
        if (!email.value.trim() || !isValidEmail(email.value)) {
            isValid = false;
            addErrorMessage(email, 'Please enter a valid email address');
        }
        
        // Validate message
        if (!message.value.trim()) {
            isValid = false;
            addErrorMessage(message, 'Please enter your message');
        }
        
        // Submit form if valid
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Your message has been sent successfully!';
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
    
    // Helper function to add error message
    function addErrorMessage(input, message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        input.parentNode.appendChild(errorMessage);
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    console.log("Contact form setup complete");
}

/**
 * Set up skill bar animations
 */
function setupSkillAnimations() {
    // Add animation classes to skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    if (!skillBars.length) {
        console.log("Skill bars not found");
        return;
    }
    
    // Set initial width to 0
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    console.log("Skill animations setup complete");
}

/**
 * Set up interactive skills with hover effects
 */
function setupInteractiveSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    if (!skillItems.length) {
        console.log("Skill items not found");
        return;
    }
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
    
    console.log("Interactive skills setup complete");
}

/**
 * Animate name reveal with letter-by-letter effect
 */
function animateNameReveal() {
    const heroHeading = document.querySelector('.hero-content h1');
    
    if (!heroHeading) {
        console.log("Hero heading not found");
        return;
    }
    
    // If already has animation class, skip
    if (heroHeading.classList.contains('name-revealed')) {
        return;
    }
    
    // Add class to prevent re-animation
    heroHeading.classList.add('name-revealed');
    
    console.log("Name reveal animation complete");
}

/**
 * Reveal elements on scroll
 */
function revealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    if (!revealElements.length) {
        return;
    }
    
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
}

/**
 * Animate skill bars on scroll
 */
function animateSkillBars() {
    const skillSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    if (!skillSection || !skillBars.length) {
        return;
    }
    
    const sectionPosition = skillSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition) {
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-progress') || '80%';
            bar.style.width = percentage;
        });
    }
}

/**
 * Set up typing effect for hero section
 */
function setupTypingEffect() {
    // Find the element where typing effect will be applied
    const typingElement = document.querySelector('.typing-element');
    
    if (!typingElement) {
        console.log("No typing element found. Add class 'typing-element' to target element.");
        return;
    }
    
    // Define the phrases to type
    const phrases = [
        "Web Developer",
        "Frontend Specialist",
        "AI Service Engineer", 
        "Cloud Infrastructure Expert",
        "Subscription Platform Architect"
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            // Deleting text
            typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 150; // Slower when typing
        }
        
        // If completed writing the phrase
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end
        } 
        // If completed deleting the phrase
        else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(type, 1000);
    
    // Add typing element to hero section if it doesn't exist
    if (!typingElement.textContent.trim()) {
        // Make sure the element has a cursor
        typingElement.style.borderRight = '2px solid var(--primary-color)';
        typingElement.style.paddingRight = '5px';
        typingElement.style.display = 'inline-block';
    }
    
    console.log("Typing effect setup complete");
} 