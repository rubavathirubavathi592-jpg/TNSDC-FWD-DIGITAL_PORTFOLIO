// Portfolio Interactive JavaScript

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const starsContainer = document.getElementById('stars');
const floatingElementsContainer = document.getElementById('floating-elements');
const addProjectBtn = document.getElementById('add-project-btn');
const projectsGrid = document.getElementById('projects-grid');

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
    initializeStars();
    initializeFloatingElements();
    initializeNavigation();
    initializeScrollEffects();
    initializeProjectManagement();
    initializeAnimations();
});

// Create animated stars background
function initializeStars() {
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (2 + Math.random() * 3) + 's';
        starsContainer.appendChild(star);
    }
}

// Create floating geometric elements
function initializeFloatingElements() {
    const shapes = ['◆', '▲', '●', '■', '★'];
    const shapeCount = 15;
    
    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        shape.style.left = Math.random() * 100 + '%';
        shape.style.fontSize = (20 + Math.random() * 30) + 'px';
        shape.style.animationDelay = Math.random() * 20 + 's';
        shape.style.animationDuration = (15 + Math.random() * 10) + 's';
        floatingElementsContainer.appendChild(shape);
    }
}

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll effects and navbar behavior
function initializeScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Navbar scroll effect
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Highlight active navigation link
        highlightActiveSection();
        
        // Parallax effect for floating elements
        const floatingShapes = document.querySelectorAll('.floating-shape');
        floatingShapes.forEach((shape, index) => {
            const speed = 0.5 + (index % 3) * 0.2;
            shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.1}deg)`;
        });
    });
}

// Highlight active section in navigation
function highlightActiveSection() {
    const sections = document.querySelectorAll('section, #home');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Project management functionality
function initializeProjectManagement() {
    let projectCount = 4; // Starting with 4 existing projects
    
    addProjectBtn.addEventListener('click', function() {
        showAddProjectModal();
    });
    
    function showAddProjectModal() {
        // Create modal for adding new project
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(30px);
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            animation: slideUp 0.3s ease;
        `;
        
        modalContent.innerHTML = `
            <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.5em; margin-bottom: 20px; text-align: center;">Add New Project</h3>
            <form id="project-form">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Project Title:</label>
                    <input type="text" id="project-title" required style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white; font-size: 1em;" placeholder="Enter project title">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Description:</label>
                    <textarea id="project-description" required rows="3" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white; font-size: 1em; resize: vertical;" placeholder="Describe your project"></textarea>
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Technologies (comma-separated):</label>
                    <input type="text" id="project-tech" required style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white; font-size: 1em;" placeholder="e.g., React, Node.js, MongoDB">
                </div>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button type="submit" style="background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer; font-weight: 600; font-size: 1em; transition: all 0.3s ease;">Add Project</button>
                    <button type="button" id="cancel-btn" style="background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 12px 24px; border-radius: 25px; cursor: pointer; font-weight: 600; font-size: 1em; transition: all 0.3s ease;">Cancel</button>
                </div>
            </form>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            input::placeholder, textarea::placeholder {
                color: rgba(255, 255, 255, 0.6);
            }
        `;
        document.head.appendChild(style);
        
        // Handle form submission
        const form = document.getElementById('project-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('project-title').value;
            const description = document.getElementById('project-description').value;
            const technologies = document.getElementById('project-tech').value;
            
            addNewProject(title, description, technologies);
            closeModal();
        });
        
        // Handle cancel
        document.getElementById('cancel-btn').addEventListener('click', closeModal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        function closeModal() {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }, 300);
        }
        
        // Add fadeOut animation
        const fadeOutStyle = document.createElement('style');
        fadeOutStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fadeOutStyle);
    }
    
    function addNewProject(title, description, technologies) {
        projectCount++;
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animation = 'slideInUp 0.6s ease';
        
        const techArray = technologies.split(',').map(tech => tech.trim());
        const techTags = techArray.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        
        projectCard.innerHTML = `
            <h3>${title}</h3>
            <div class="project-description">${description}</div>
            <div class="project-tech">
                ${techTags}
            </div>
            <button class="remove-project" onclick="removeProject(this)" style="
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(255, 59, 59, 0.2);
                border: 1px solid rgba(255, 59, 59, 0.4);
                color: #ff3b3b;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                cursor: pointer;
                font-size: 0.8em;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            ">×</button>
        `;
        
        // Insert before the add button
        projectsGrid.appendChild(projectCard);
        
        // Add slide-in animation
        const slideStyle = document.createElement('style');
        slideStyle.textContent = `
            @keyframes slideInUp {
                from { 
                    opacity: 0;
                    transform: translateY(30px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(slideStyle);
        
        // Show success message
        showNotification('Project added successfully!', 'success');
    }
}

// Remove project functionality
function removeProject(button) {
    const projectCard = button.parentElement;
    projectCard.style.animation = 'slideOutDown 0.4s ease';
    
    setTimeout(() => {
        projectCard.remove();
        showNotification('Project removed', 'info');
    }, 400);
    
    // Add slide-out animation
    if (!document.querySelector('#slide-out-style')) {
        const slideOutStyle = document.createElement('style');
        slideOutStyle.id = 'slide-out-style';
        slideOutStyle.textContent = `
            @keyframes slideOutDown {
                from { 
                    opacity: 1;
                    transform: translateY(0);
                }
                to { 
                    opacity: 0;
                    transform: translateY(30px);
                }
            }
        `;
        document.head.appendChild(slideOutStyle);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#4ade80' : type === 'error' ? '#ff6b6b' : '#4facfe';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10001;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
    
    // Add notification animations
    if (!document.querySelector('#notification-style')) {
        const notificationStyle = document.createElement('style');
        notificationStyle.id = 'notification-style';
        notificationStyle.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(notificationStyle);
    }
}

// Initialize animations and interactive elements
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all glass cards
    document.querySelectorAll('.glass-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add fade-in animation
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes fadeInUp {
            from { 
                opacity: 0;
                transform: translateY(30px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
        .glass-card {
            opacity: 0;
        }
    `;
    document.head.appendChild(animationStyle);
}

// Enhanced scroll effects
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    // Parallax effect for background elements
    starsContainer.style.transform = `translateY(${parallax}px)`;
    floatingElementsContainer.style.transform = `translateY(${parallax * 0.3}px)`;
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Skill item interactions
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Create sparkle effect
            createSparkles(this);
        });
    });
});

function createSparkles(element) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #4ade80;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkle 1s ease-out forwards;
        `;
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = (Math.random() * rect.width) + 'px';
        sparkle.style.top = (Math.random() * rect.height) + 'px';
        
        element.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 1000);
    }
    
    // Add sparkle animation
    if (!document.querySelector('#sparkle-style')) {
        const sparkleStyle = document.createElement('style');
        sparkleStyle.id = 'sparkle-style';
        sparkleStyle.textContent = `
            @keyframes sparkle {
                0% { 
                    opacity: 0;
                    transform: scale(0);
                }
                50% { 
                    opacity: 1;
                    transform: scale(1);
                }
                100% { 
                    opacity: 0;
                    transform: scale(0) translateY(-20px);
                }
            }
        `;
        document.head.appendChild(sparkleStyle);
    }
}

// Contact interactions
document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const contactValue = this.querySelector('.contact-value a');
            if (contactValue) {
                // Create ripple effect
                createRipple(this, event);
            }
        });
    });
});

function createRipple(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(74, 222, 128, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
    
    // Add ripple animation
    if (!document.querySelector('#ripple-style')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-style';
        rippleStyle.textContent = `
            @keyframes ripple {
                from {
                    transform: scale(0);
                    opacity: 1;
                }
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            .contact-item {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(rippleStyle);
    }
}

// Enhanced profile photo interaction
document.addEventListener('DOMContentLoaded', function() {
    const profilePhoto = document.querySelector('.profile-photo');
    
    if (profilePhoto) {
        profilePhoto.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.filter = 'brightness(1.2) saturate(1.3)';
        });
        
        profilePhoto.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1) saturate(1)';
        });
    }
});

// Smooth reveal animations for timeline
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `slideInLeft 0.6s ease ${index * 0.2}s forwards`;
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        timelineObserver.observe(item);
    });
    
    // Add timeline animation
    const timelineStyle = document.createElement('style');
    timelineStyle.textContent = `
        @keyframes slideInLeft {
            from { 
                opacity: 0;
                transform: translateX(-50px);
            }
            to { 
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(timelineStyle);
});

// Dynamic cursor trail effect
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(79, 172, 254, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: screen;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Enhance cursor on interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .skill-item, .contact-item, .project-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, rgba(74, 222, 128, 0.8), transparent)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(79, 172, 254, 0.8), transparent)';
        });
    });
});

// Loading screen effect
window.addEventListener('load', function() {
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        animation: fadeOut 1s ease 0.5s forwards;
    `;
    
    loadingScreen.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 3em; font-weight: 700; margin-bottom: 20px; animation: bounce 1s infinite;">
                Rubavathi
            </div>
            <div style="width: 50px; height: 3px; background: white; margin: 0 auto; border-radius: 2px; animation: loading 1s infinite;">
            </div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        @keyframes loading {
            0%, 100% { width: 20px; }
            50% { width: 80px; }
        }
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(loadingStyle);
    
    setTimeout(() => {
        if (loadingScreen.parentNode) {
            loadingScreen.remove();
            document.head.removeChild(loadingStyle);
        }
    }, 1500);
});

// Easter egg: Konami code
let konamiSequence = [];
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiSequence.push(e.code);
    
    if (konamiSequence.length > konamiCode.length) {
        konamiSequence.shift();
    }
    
    if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
        activateEasterEgg();
        konamiSequence = [];
    }
});

function activateEasterEgg() {
    // Rainbow effect on all elements
    const elements = document.querySelectorAll('.glass-card, .skill-item, .project-card');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = 'rainbow 2s ease infinite';
            element.style.transform = 'rotate(360deg) scale(1.1)';
            
            setTimeout(() => {
                element.style.animation = '';
                element.style.transform = '';
            }, 2000);
        }, index * 100);
    });
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg) saturate(1.5); }
            25% { filter: hue-rotate(90deg) saturate(1.5); }
            50% { filter: hue-rotate(180deg) saturate(1.5); }
            75% { filter: hue-rotate(270deg) saturate(1.5); }
            100% { filter: hue-rotate(360deg) saturate(1.5); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    showNotification('🎉 Easter egg activated! You found the secret!', 'success');
    
    setTimeout(() => {
        document.head.removeChild(rainbowStyle);
    }, 3000);
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll event
const throttledScroll = throttle(function() {
    highlightActiveSection();
}, 100);

window.addEventListener('scroll', throttledScroll);

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 100000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels for better accessibility
    const socialLinks = document.querySelectorAll('.social-link');
    const socialLabels = ['LinkedIn Profile', 'GitHub Profile', 'Behance Portfolio', 'Instagram'];
    
    socialLinks.forEach((link, index) => {
        link.setAttribute('aria-label', socialLabels[index] || 'Social Media Profile');
    });
    
    // Add focus indicators
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        button:focus, a:focus, .skill-item:focus, .contact-item:focus {
            outline: 2px solid #4ade80;
            outline-offset: 2px;
        }
        .nav-link:focus {
            color: #4ade80;
            outline: 2px solid #4ade80;
            outline-offset: 4px;
        }
    `;
    document.head.appendChild(focusStyle);
});

// Console message for developers
console.log(`
🎨 Welcome to Rubavathi's Portfolio! 🎨
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ This portfolio features:
   • Interactive animations and effects
   • Dynamic project management
   • Responsive design elements
   • Accessibility enhancements
   • Easter eggs (try the Konami code!)

💻 Built with vanilla JavaScript, HTML5, and CSS3
🌟 Crafted with passion and attention to detail
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Initialize theme switcher (bonus feature)
function initializeThemeSwitcher() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        font-size: 1.5em;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    let isDarkMode = false;
    
    themeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
            this.innerHTML = '☀️';
            showNotification('Dark mode activated', 'info');
        } else {
            document.body.style.filter = '';
            this.innerHTML = '🌙';
            showNotification('Light mode activated', 'info');
        }
        
        // Animate the toggle
        this.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
    
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'rgba(255, 255, 255, 0.25)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'rgba(255, 255, 255, 0.15)';
    });
    
    document.body.appendChild(themeToggle);
}

// Text typing effect for tagline
function initializeTypingEffect() {
    const tagline = document.querySelector('.tagline');
    const originalText = tagline.textContent;
    tagline.textContent = '';
    
    let i = 0;
    const typingEffect = setInterval(() => {
        tagline.textContent += originalText.charAt(i);
        i++;
        
        if (i > originalText.length) {
            clearInterval(typingEffect);
            // Add cursor blink effect
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            tagline.appendChild(cursor);
            
            // Add blink animation
            const blinkStyle = document.createElement('style');
            blinkStyle.textContent = `
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `;
            document.head.appendChild(blinkStyle);
            
            setTimeout(() => {
                cursor.remove();
            }, 3000);
        }
    }, 100);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeThemeSwitcher();
        initializeTypingEffect();
    }, 1000);
});

// Scroll progress indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #4facfe, #00f2fe);
        z-index: 1001;
        transition: width 0.1s ease;
        border-radius: 0 2px 2px 0;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress on load
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollProgress();
});

// Enhanced project card interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Create floating particles
            for (let i = 0; i < 3; i++) {
                createFloatingParticle(this);
            }
        });
    });
});

function createFloatingParticle(element) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: #4facfe;
        border-radius: 50%;
        pointer-events: none;
        animation: floatUp 2s ease-out forwards;
        z-index: 10;
    `;
    
    const rect = element.getBoundingClientRect();
    particle.style.left = Math.random() * rect.width + 'px';
    particle.style.bottom = '0px';
    
    element.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 2000);
    
    // Add float animation
    if (!document.querySelector('#float-style')) {
        const floatStyle = document.createElement('style');
        floatStyle.id = 'float-style';
        floatStyle.textContent = `
            @keyframes floatUp {
                0% { 
                    opacity: 0;
                    transform: translateY(0) scale(0);
                }
                20% { 
                    opacity: 1;
                    transform: translateY(-10px) scale(1);
                }
                100% { 
                    opacity: 0;
                    transform: translateY(-50px) scale(0);
                }
            }
            .project-card {
                position: relative;
                overflow: visible;
            }
        `;
        document.head.appendChild(floatStyle);
    }
}

// Auto-save functionality for projects (simulated)
let projectData = [];

function saveProjectData() {
    // In a real application, this would save to a database
    const projects = Array.from(document.querySelectorAll('.project-card')).map(card => {
        return {
            title: card.querySelector('h3').textContent,
            description: card.querySelector('.project-description').textContent,
            technologies: Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent)
        };
    });
    
    projectData = projects;
    console.log('Projects saved:', projectData);
}

// Smooth reveal animation for stats
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
});

function animateNumber(element) {
    const finalNumber = element.textContent;
    const isPercentage = finalNumber.includes('%');
    const number = parseInt(finalNumber);
    
    if (isNaN(number)) return;
    
    element.textContent = '0' + (isPercentage ? '%' : '');
    
    const increment = number / 50;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = finalNumber;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (isPercentage ? '%' : (finalNumber.includes('+') ? '+' : ''));
        }
    }, 30);
}