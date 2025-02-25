// Enhanced project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    // Update project filtering to include new technology categories
    const techCategories = [
        {id: 'all', label: 'All Projects'},
        {id: 'frontend', label: 'Frontend', icon: 'fas fa-laptop-code'},
        {id: 'backend', label: 'Backend', icon: 'fas fa-server'},
        {id: 'ai', label: 'AI & ML', icon: 'fas fa-brain'},
        {id: 'data', label: 'Data', icon: 'fas fa-database'},
        {id: 'devops', label: 'DevOps', icon: 'fas fa-code-branch'},
        {id: 'cloud', label: 'Cloud', icon: 'fas fa-cloud'},
        {id: 'subscription', label: 'Subscription', icon: 'fas fa-credit-card'},
        {id: 'mobile', label: 'Mobile', icon: 'fas fa-mobile-alt'},
        {id: 'security', label: 'Security', icon: 'fas fa-shield-alt'}
    ];
    
    // Get the filter container
    const filterContainer = document.querySelector('.project-filters');
    
    if (filterContainer) {
        // Clear existing filters
        filterContainer.innerHTML = '';
        
        // Add new filter buttons with icons
        techCategories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.setAttribute('data-filter', category.id);
            
            // Add icon if available
            if (category.icon && category.id !== 'all') {
                btn.innerHTML = `<i class="${category.icon}"></i> ${category.label}`;
            } else {
                btn.textContent = category.label;
            }
            
            // Set 'all' as active by default
            if (category.id === 'all') {
                btn.classList.add('active');
            }
            
            filterContainer.appendChild(btn);
        });
        
        // Add click event listeners to all filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects with animation
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        // Show card with animation
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    } else {
                        // Hide card with animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Project image hover effects
    const projectImages = document.querySelectorAll('.project-img');
    
    projectImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        img.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    // Initialize projects with a staggered fade-in
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }, 100 * index);
    });
}); 