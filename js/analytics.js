/**
 * Privacy-friendly analytics script
 * Uses a self-hosted Plausible or Simple Analytics approach
 */

// Analytics Configuration
const ANALYTICS_CONFIG = {
    endpoint: 'https://youranalytics.com/api/event', // Replace with your endpoint
    siteId: 'portfolio', // Your site identifier
    trackerName: 'portfolioTracker',
    includeReferrer: true,
    hashMode: false, // Set to true if using hash-based routing
    trackClicks: true,
    trackForms: true,
    trackErrors: true
};

// Main Analytics Tracker Class
class PortfolioAnalytics {
    constructor(config) {
        this.config = config;
        this.previousPath = '';
        this.visitId = this.generateVisitId();
        this.initialized = false;
    }
    
    init() {
        if (this.initialized) return;
        
        // Initial page view
        this.trackPageView();
        
        // Setup history change tracking for SPAs
        this.setupHistoryTracking();
        
        // Setup interaction tracking
        if (this.config.trackClicks) this.setupClickTracking();
        if (this.config.trackForms) this.setupFormTracking();
        if (this.config.trackErrors) this.setupErrorTracking();
        
        // Mark as initialized
        this.initialized = true;
        console.log('Analytics initialized');
    }
    
    // Generate a unique visit ID
    generateVisitId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    // Get current page path
    getPath() {
        return this.config.hashMode 
            ? window.location.hash.substring(1) || '/' 
            : window.location.pathname;
    }
    
    // Track page view
    trackPageView(path = null) {
        const currentPath = path || this.getPath();
        
        // Don't track the same page twice in a row
        if (currentPath === this.previousPath) return;
        this.previousPath = currentPath;
        
        this.sendEvent('pageview', {
            path: currentPath,
            title: document.title
        });
    }
    
    // Send event to analytics endpoint
    sendEvent(eventName, data = {}) {
        // Don't track in development/localhost
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Analytics event in development:', eventName, data);
            return;
        }
        
        // Prepare the payload
        const payload = {
            name: eventName,
            url: window.location.href,
            domain: window.location.hostname,
            referrer: this.config.includeReferrer ? document.referrer : null,
            visitId: this.visitId,
            screenWidth: window.innerWidth,
            data: data,
            timestamp: new Date().toISOString()
        };
        
        // Use Beacon API if available, XHR as fallback
        if (navigator.sendBeacon) {
            navigator.sendBeacon(this.config.endpoint, JSON.stringify(payload));
        } else {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', this.config.endpoint, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(payload));
        }
    }
    
    // Track history changes (for SPAs)
    setupHistoryTracking() {
        const originalPushState = history.pushState;
        const analytics = this;
        
        history.pushState = function(state, title, url) {
            originalPushState.call(this, state, title, url);
            analytics.trackPageView();
        };
        
        window.addEventListener('popstate', () => {
            this.trackPageView();
        });
    }
    
    // Track clicks on important elements
    setupClickTracking() {
        document.addEventListener('click', (e) => {
            // Track navigation clicks
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                const link = e.target.tagName === 'A' ? e.target : e.target.closest('a');
                const href = link.getAttribute('href');
                
                // Don't track javascript: links or anchor links
                if (href && !href.startsWith('javascript:') && !href.startsWith('#')) {
                    this.sendEvent('link_click', {
                        url: href,
                        text: link.textContent.trim().substring(0, 50),
                        id: link.id || null,
                        classes: link.className || null
                    });
                }
            }
            
            // Track button clicks
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
                this.sendEvent('button_click', {
                    id: button.id || null,
                    text: button.textContent.trim().substring(0, 50),
                    classes: button.className || null
                });
            }
            
            // Track portfolio project clicks
            if (e.target.closest('.project-card')) {
                const projectCard = e.target.closest('.project-card');
                const projectTitle = projectCard.querySelector('h3')?.textContent;
                
                this.sendEvent('project_click', {
                    title: projectTitle || 'Unknown Project',
                    id: projectCard.id || null
                });
            }
        });
    }
    
    // Track form submissions
    setupFormTracking() {
        document.addEventListener('submit', (e) => {
            if (e.target.tagName === 'FORM') {
                const form = e.target;
                this.sendEvent('form_submit', {
                    id: form.id || null,
                    action: form.action || null,
                    formName: form.getAttribute('name') || form.id || 'unknown'
                });
            }
        });
    }
    
    // Track JS errors
    setupErrorTracking() {
        window.addEventListener('error', (e) => {
            this.sendEvent('js_error', {
                message: e.message,
                source: e.filename,
                line: e.lineno,
                column: e.colno
            });
        });
    }
    
    // Custom event tracking (for external use)
    trackEvent(eventName, eventData = {}) {
        this.sendEvent(eventName, eventData);
    }
}

// Initialize analytics
document.addEventListener('DOMContentLoaded', function() {
    // Create global tracker instance
    window[ANALYTICS_CONFIG.trackerName] = new PortfolioAnalytics(ANALYTICS_CONFIG);
    window[ANALYTICS_CONFIG.trackerName].init();
    
    // Track portfolio-specific events
    trackPortfolioEvents();
});

// Portfolio-specific event tracking
function trackPortfolioEvents() {
    const tracker = window[ANALYTICS_CONFIG.trackerName];
    
    // Track skill hover
    document.querySelectorAll('.skill-item').forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            const skillName = skill.querySelector('h3')?.textContent || 'Unknown Skill';
            tracker.trackEvent('skill_hover', { skill: skillName });
        });
    });
    
    // Track contact form field interactions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formFields = contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('focus', () => {
                tracker.trackEvent('form_field_focus', { 
                    field: field.name || field.id 
                });
            });
        });
    }
    
    // Track download resume if such button exists
    const resumeButton = document.querySelector('a[href$=".pdf"], a.resume-download');
    if (resumeButton) {
        resumeButton.addEventListener('click', () => {
            tracker.trackEvent('resume_download');
        });
    }
    
    // Track time spent on page
    let timeOnSite = 0;
    const timeInterval = setInterval(() => {
        timeOnSite += 10;
        if (timeOnSite === 30) { // 30 seconds
            tracker.trackEvent('engagement', { time: '30_seconds' });
        } else if (timeOnSite === 60) { // 1 minute
            tracker.trackEvent('engagement', { time: '1_minute' });
        } else if (timeOnSite === 180) { // 3 minutes
            tracker.trackEvent('engagement', { time: '3_minutes' });
            clearInterval(timeInterval); // Stop tracking after 3 minutes
        }
    }, 10000); // Check every 10 seconds
} 