// Enhanced Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Add CSRF token for security
    addCsrfToken(contactForm);
    
    // Add honeypot field for spam protection
    addHoneypotField(contactForm);
    
    // Set up form validation
    setupFormValidation(contactForm);
    
    // Handle form submission
    contactForm.addEventListener('submit', handleSubmit);
});

// Add CSRF token to form
function addCsrfToken(form) {
    // Generate a random token
    const token = generateRandomToken();
    
    // Store in session storage
    sessionStorage.setItem('csrf_token', token);
    
    // Add to form
    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrf_token';
    csrfInput.value = token;
    form.appendChild(csrfInput);
}

// Generate random token
function generateRandomToken() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

// Add honeypot field for spam protection
function addHoneypotField(form) {
    const honeypotContainer = document.createElement('div');
    honeypotContainer.style.opacity = '0';
    honeypotContainer.style.position = 'absolute';
    honeypotContainer.style.top = '-9999px';
    honeypotContainer.style.left = '-9999px';
    honeypotContainer.style.height = '0';
    honeypotContainer.style.overflow = 'hidden';
    
    const honeypotInput = document.createElement('input');
    honeypotInput.type = 'text';
    honeypotInput.name = 'website';
    honeypotInput.autocomplete = 'off';
    
    honeypotContainer.appendChild(honeypotInput);
    form.appendChild(honeypotContainer);
}

// Set up form validation
function setupFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        if (input.hasAttribute('required')) {
            // Add validation on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Add validation on input
            input.addEventListener('input', function() {
                // If field was previously marked as invalid, revalidate on input
                if (this.classList.contains('invalid')) {
                    validateField(this);
                }
            });
        }
        
        // Add special validation for email field
        if (input.type === 'email') {
            input.addEventListener('blur', function() {
                validateEmail(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('invalid')) {
                    validateEmail(this);
                }
            });
        }
    });
}

// Validate a single field
function validateField(field) {
    const errorId = `${field.id}-error`;
    let errorElement = document.getElementById(errorId);
    
    // Create error element if it doesn't exist
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.id = errorId;
        field.parentNode.appendChild(errorElement);
        
        // Add aria attributes for accessibility
        field.setAttribute('aria-describedby', errorId);
    }
    
    // Check if field is empty
    if (!field.value.trim()) {
        field.classList.add('invalid');
        errorElement.textContent = 'This field is required';
        errorElement.style.display = 'block';
        return false;
    } else {
        field.classList.remove('invalid');
        errorElement.style.display = 'none';
        return true;
    }
}

// Validate email field
function validateEmail(field) {
    const errorId = `${field.id}-error`;
    let errorElement = document.getElementById(errorId);
    
    // Create error element if it doesn't exist
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.id = errorId;
        field.parentNode.appendChild(errorElement);
        
        // Add aria attributes
        field.setAttribute('aria-describedby', errorId);
    }
    
    // Check if field is empty
    if (!field.value.trim()) {
        field.classList.add('invalid');
        errorElement.textContent = 'Email is required';
        errorElement.style.display = 'block';
        return false;
    }
    
    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(field.value)) {
        field.classList.add('invalid');
        errorElement.textContent = 'Please enter a valid email address';
        errorElement.style.display = 'block';
        return false;
    } else {
        field.classList.remove('invalid');
        errorElement.style.display = 'none';
        return true;
    }
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    
    const form = this;
    let isValid = true;
    
    // Validate all required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (field.type === 'email') {
            if (!validateEmail(field)) isValid = false;
        } else {
            if (!validateField(field)) isValid = false;
        }
    });
    
    if (!isValid) return;
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span>Sending...';
    
    // Collect form data
    const formData = new FormData(form);
    
    // Send the form
    fetch('contact-handler.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok');
    })
    .then(data => {
        if (data.success) {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>${data.message || 'Thank you for your message!'}</span>
            `;
            
            // Reset form
            form.reset();
            
            // Add success class to button
            submitBtn.className = 'btn primary-btn success';
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            
            // Remove any previous success messages
            const oldMessage = form.querySelector('.success-message');
            if (oldMessage) oldMessage.remove();
            
            // Add the new success message
            form.appendChild(successMessage);
            
            // Reset button state after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                submitBtn.className = 'btn primary-btn';
            }, 3000);
            
            // If redirecting, do it after showing success message
            if (data.redirect) {
                setTimeout(() => {
                    window.location.href = data.redirect;
                }, 1000);
            }
        } else {
            // Handle validation errors
            if (data.errors && data.errors.length) {
                data.errors.forEach(fieldName => {
                    const field = form.querySelector(`[name="${fieldName}"]`);
                    if (field) {
                        field.classList.add('invalid');
                        
                        const errorId = `${field.id}-error`;
                        let errorElement = document.getElementById(errorId);
                        
                        if (!errorElement) {
                            errorElement = document.createElement('div');
                            errorElement.className = 'error-message';
                            errorElement.id = errorId;
                            field.parentNode.appendChild(errorElement);
                        }
                        
                        errorElement.textContent = data.message || 'Invalid input';
                        errorElement.style.display = 'block';
                    }
                });
            } else {
                // Show general error
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message general-error';
                errorMessage.textContent = data.message || 'An error occurred. Please try again.';
                
                // Remove any previous error messages
                const oldError = form.querySelector('.general-error');
                if (oldError) oldError.remove();
                
                form.appendChild(errorMessage);
            }
            
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message general-error';
        errorMessage.textContent = 'An error occurred while sending your message. Please try again later.';
        
        // Remove any previous error messages
        const oldError = form.querySelector('.general-error');
        if (oldError) oldError.remove();
        
        form.appendChild(errorMessage);
        
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    });
} 