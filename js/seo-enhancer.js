// Add alt tags to all images without them
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach((img, index) => {
        const parentSection = img.closest('section');
        const sectionId = parentSection ? parentSection.id : 'general';
        const nearestHeading = parentSection ? 
            parentSection.querySelector('h1, h2, h3, h4, h5, h6')?.textContent : 'Portfolio';
        
        img.alt = `${nearestHeading || 'Portfolio'} - visual element ${index + 1}`;
    });
    
    // Add missing rel attributes
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.rel.includes('noopener')) {
            link.setAttribute('rel', link.rel ? link.rel + ' noopener noreferrer' : 'noopener noreferrer');
        }
    });
    
    // Add title attributes where missing
    document.querySelectorAll('a:not([title])').forEach(link => {
        link.title = link.textContent.trim();
    });
}); 