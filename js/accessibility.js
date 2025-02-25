// Enhance keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    // Fix keyboard navigation for the hamburger menu
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Update ARIA attributes on toggle
        hamburger.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
        });
    }
    
    // Make project cards keyboard navigable
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        
        // Allow keyboard activation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('a');
                if (link) link.click();
            }
        });
    });
    
    // Announce form errors to screen readers
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            const invalidFields = form.querySelectorAll(':invalid');
            
            if (invalidFields.length > 0) {
                e.preventDefault();
                const firstInvalid = invalidFields[0];
                
                // Create or update error message
                let errorMsg = firstInvalid.nextElementSibling;
                if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.id = `${firstInvalid.id}-error`;
                    errorMsg.setAttribute('role', 'alert');
                    firstInvalid.parentNode.insertBefore(errorMsg, firstInvalid.nextSibling);
                    firstInvalid.setAttribute('aria-describedby', errorMsg.id);
                }
                
                errorMsg.textContent = `${firstInvalid.labels[0].textContent} is required`;
                firstInvalid.focus();
            }
        });
    }
}); 