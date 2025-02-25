// --- NAVIGATION CONTROLS ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

// Mobile Navigation Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks?.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger?.classList.remove('active');
        }
    });
});

// --- SCROLL EFFECTS ---
// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
});

// Reveal animations on scroll
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - 100) {
            section.classList.add('revealed');
        }
    });
}

// --- TYPING EFFECT ---
const typedTextSpan = document.querySelector('.typed-text');
const roles = ['Web Developer', 'UI/UX Designer', 'Software Engineer', 'Problem Solver'];

function setupTypingEffect() {
    if (!typedTextSpan) return;
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingDelay = 100;
    const erasingDelay = 50;
    const newRoleDelay = 2000;
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        const currentChar = currentRole.substring(0, charIndex);
        
        typedTextSpan.textContent = currentChar;
        
        if (!isDeleting && charIndex < currentRole.length) {
            // Typing
            charIndex++;
            setTimeout(typeEffect, typingDelay);
        } else if (isDeleting && charIndex > 0) {
            // Erasing
            charIndex--;
            setTimeout(typeEffect, erasingDelay);
        } else {
            // Change to next role
            isDeleting = !isDeleting;
            if (!isDeleting) {
                roleIndex = (roleIndex + 1) % roles.length;
            }
            setTimeout(typeEffect, isDeleting ? newRoleDelay : typingDelay);
        }
    }
    
    setTimeout(typeEffect, newRoleDelay);
}

// --- PROJECT FILTERING ---
function setupProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Set active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Get selected filter
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const isVisible = filter === 'all' || card.getAttribute('data-category') === filter;
                animateCardVisibility(card, isVisible);
            });
        });
    });
}

function animateCardVisibility(card, isVisible) {
    card.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        card.style.display = isVisible ? 'block' : 'none';
        
        if (isVisible) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        }
    }, 300);
}

// --- SMOOTH SCROLLING ---
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - headerHeight,
                behavior: 'smooth'
            });
        });
    });
}

// --- CONTACT FORM HANDLING ---
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form elements
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const subject = document.getElementById('subject')?.value || '';
        const message = document.getElementById('message')?.value || '';
        
        if (!submitBtn || !name || !email || !subject || !message) return;
        
        // Add loading state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (would be replaced with actual API call)
        setTimeout(() => {
            handleFormSuccess(contactForm, submitBtn, originalBtnText, name);
        }, 1500);
    });
}

function handleFormSuccess(form, button, originalText, userName) {
    // Success state
    button.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
    button.classList.add('success');
    
    // Create and append success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `<i class="fas fa-check-circle"></i> Thanks for your message, ${userName}! I'll get back to you soon.`;
    form.appendChild(successMessage);
    
    // Animate success message
    setTimeout(() => {
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateY(0)';
    }, 100);
    
    // Reset form
    form.reset();
    
    // Reset button after delay
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        button.classList.remove('success');
        
        // Remove success message
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            form.removeChild(successMessage);
        }, 300);
    }, 3000);
}

// --- SKILL ANIMATIONS ---
function setupSkillAnimations() {
    // Store original values but set initial display to 0%
    const skillLevels = document.querySelectorAll('.skill-level');
    const skillPercents = document.querySelectorAll('.skill-percent');
    
    skillLevels.forEach((level, index) => {
        // Store the target width as a data attribute
        const targetWidth = level.style.width;
        level.setAttribute('data-target-width', targetWidth);
        
        // Set initial width to 0%
        level.style.width = '0%';
        
        // Set percentage text to 0%
        if (skillPercents[index]) {
            const targetPercent = skillPercents[index].textContent;
            skillPercents[index].setAttribute('data-target-percent', targetPercent);
            skillPercents[index].textContent = '0%';
        }
    });
}

function animateSkillBars() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const skillLevels = document.querySelectorAll('.skill-level');
    const skillPercents = document.querySelectorAll('.skill-percent');
    const windowHeight = window.innerHeight;
    const sectionTop = skillsSection.getBoundingClientRect().top;
    
    // Check if skills section is in view
    if (sectionTop >= windowHeight - 100 || skillsSection.classList.contains('animated')) {
        return;
    }
    
    skillsSection.classList.add('animated');
    
    // Animate each skill bar
    skillLevels.forEach((level, index) => {
        // Get target width from data attribute
        const targetWidth = level.getAttribute('data-target-width') || level.style.width;
        const delay = 300 * index; // Stagger the animations
        
        // Animate width to target percentage
        setTimeout(() => {
            level.style.transition = 'width 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            level.style.width = targetWidth;
        }, delay);
        
        // Animate the percentage counter
        if (skillPercents[index]) {
            const targetPercent = parseInt(
                skillPercents[index].getAttribute('data-target-percent') || 
                skillPercents[index].textContent
            );
            animateCounter(skillPercents[index], 0, targetPercent, 1800, delay);
        }
    });
    
    // Add a pulse effect after all bars have animated
    setTimeout(() => {
        skillLevels.forEach(level => {
            level.classList.add('completed');
        });
    }, 2000 + (skillLevels.length * 300));
}

// --- INTERACTIVE SKILL ITEMS ---
function setupInteractiveSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    if (!skillItems.length) return;
    
    skillItems.forEach(item => {
        const skillBar = item.querySelector('.skill-bar');
        const skillLevel = item.querySelector('.skill-level');
        
        // Add click event to flip skill cards
        item.addEventListener('click', () => {
            item.classList.toggle('flipped');
        });
        
        // Reset flip state when mouse leaves
        item.addEventListener('mouseleave', () => {
            setTimeout(() => {
                item.classList.remove('flipped');
            }, 1000);
        });
        
        // Reactive bars that follow mouse movement
        if (skillBar && skillLevel) {
            setupSkillBarInteraction(skillBar, skillLevel);
        }
    });
}

function setupSkillBarInteraction(skillBar, skillLevel) {
    skillBar.addEventListener('mousemove', (e) => {
        // Calculate mouse position relative to the skill bar
        const rect = skillBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate percentage of width where mouse is
        const mousePercent = Math.min(Math.max(x / rect.width * 100, 0), 100);
        
        // Get the actual skill percentage as a number
        const skillPercent = parseFloat(skillLevel.style.width);
        
        // If mouse is within the filled area, create a "push" effect
        if (mousePercent <= skillPercent) {
            // Create wave effect with CSS custom property
            skillLevel.style.setProperty('--wave-position', `${mousePercent}%`);
            skillLevel.classList.add('wave-effect');
            
            // Calculate the height of the wave based on mouse Y position
            const waveHeight = 1 + ((rect.height - y) / rect.height);
            skillLevel.style.setProperty('--wave-height', waveHeight);
        } else {
            skillLevel.classList.remove('wave-effect');
        }
    });
    
    // Remove effects when mouse leaves
    skillBar.addEventListener('mouseleave', () => {
        skillLevel.classList.remove('wave-effect');
    });
}

// Animate counter from start to end value with optional delay
function animateCounter(element, start, end, duration, delay = 0) {
    setTimeout(() => {
        let startTime = null;
        
        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Use easeOutQuad for a nicer animation curve
            const easeProgress = 1 - Math.pow(1 - progress, 2);
            const currentValue = Math.floor(easeProgress * (end - start) + start);
            
            element.textContent = currentValue + '%';
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            } else {
                element.textContent = end + '%';
            }
        }
        
        requestAnimationFrame(animation);
    }, delay);
}

// --- CSS FOR SUCCESS MESSAGE ---
function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            background-color: rgba(6, 214, 160, 0.1);
            color: var(--success-color);
            padding: 1rem;
            border-radius: var(--border-radius-md);
            margin-top: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        }
        
        button.success {
            background: linear-gradient(90deg, var(--success-color), #09bc8a) !important;
        }
    `;
    document.head.appendChild(style);
}

// --- INITIALIZATION ---
function initializePortfolio() {
    // Add custom CSS
    addCustomStyles();
    
    // Setup interactive components
    setupTypingEffect();
    setupProjectFiltering();
    setupSmoothScrolling();
    setupContactForm();
    setupSkillAnimations();
    setupInteractiveSkills();
    
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