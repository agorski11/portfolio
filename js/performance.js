// Image loading optimization
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
        });
    }
    
    // Code splitting example - load components on demand
    function loadComponent(componentName) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `js/components/${componentName}.js`;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load ${componentName}`));
            document.body.appendChild(script);
        });
    }
    
    // Load testimonials only when that section comes into view
    const testimonialSection = document.querySelector('.testimonial-section');
    if (testimonialSection) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadComponent('testimonials')
                    .then(() => {
                        if (window.initTestimonials) {
                            window.initTestimonials();
                        }
                    })
                    .catch(console.error);
                observer.disconnect();
            }
        });
        observer.observe(testimonialSection);
    }
}); 