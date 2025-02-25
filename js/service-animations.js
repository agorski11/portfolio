// Enhanced animations for service and project sections
document.addEventListener('DOMContentLoaded', function() {
    // Animate service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated', 'fadeInUp');
                        // Add staggered delay for each card
                    }, index * 150);
                    serviceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        serviceCards.forEach(card => {
            serviceObserver.observe(card);
            // Initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
        });
    }
    
    // Add hover effects to service icons
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Filter projects by specialized categories
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add new filter buttons if needed
    const projectFilters = document.querySelector('.project-filters');
    if (projectFilters) {
        const newFilters = ['subscription', 'gifting', 'ai', 'cloud'];
        
        newFilters.forEach(filter => {
            // Check if filter already exists
            const exists = Array.from(filterButtons).some(btn => 
                btn.getAttribute('data-filter') === filter
            );
            
            if (!exists) {
                const newBtn = document.createElement('button');
                newBtn.className = 'filter-btn';
                newBtn.setAttribute('data-filter', filter);
                newBtn.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);
                projectFilters.appendChild(newBtn);
                
                // Add event listener to new button
                newBtn.addEventListener('click', function() {
                    const filterValue = this.getAttribute('data-filter');
                    
                    // Update active button
                    document.querySelectorAll('.filter-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Filter projects
                    projectCards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            }
        });
    }
    
    // Add statistics counters to show expertise level
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const statsContainer = document.createElement('div');
        statsContainer.className = 'expertise-stats';
        
        const stats = [
            { label: 'Projects Completed', value: 57, icon: 'fas fa-check-circle' },
            { label: 'Subscription Systems', value: 23, icon: 'fas fa-receipt' },
            { label: 'Cloud Migrations', value: 15, icon: 'fas fa-cloud-upload-alt' },
            { label: 'AI Implementations', value: 19, icon: 'fas fa-brain' }
        ];
        
        stats.forEach(stat => {
            const statBox = document.createElement('div');
            statBox.className = 'stat-box';
            statBox.innerHTML = `
                <div class="stat-icon"><i class="${stat.icon}"></i></div>
                <div class="stat-value">0</div>
                <div class="stat-label">${stat.label}</div>
            `;
            statsContainer.appendChild(statBox);
        });
        
        // Insert after about text
        const aboutText = aboutSection.querySelector('.about-text');
        if (aboutText) {
            aboutText.parentNode.insertBefore(statsContainer, aboutText.nextSibling);
            
            // Add animation for stats
            const statValues = statsContainer.querySelectorAll('.stat-value');
            const statObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    statValues.forEach((el, i) => {
                        const targetValue = stats[i].value;
                        animateCounter(el, targetValue);
                    });
                    statObserver.disconnect();
                }
            });
            
            statObserver.observe(statsContainer);
        }
    }
    
    // Counter animation function
    function animateCounter(element, target) {
        let start = 0;
        const duration = 2000; // 2 seconds
        const step = timestamp => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const easeProgress = easeOutCubic(progress);
            element.textContent = Math.floor(easeProgress * target);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = target;
            }
        };
        
        window.requestAnimationFrame(step);
    }
    
    // Easing function for smoother animation
    function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
    }
}); 