// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
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

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add transition to header
    header.style.transition = 'transform 0.3s ease-in-out';

    // Service card animations
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Intersection Observer for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Video loading and fallback handling
    const video = document.querySelector('.hero-vid');
    if (video) {
        // Add loading class initially
        video.classList.add('loading');
        
        // Handle video loading
        video.addEventListener('loadstart', function() {
            this.classList.add('loading');
        });
        
        video.addEventListener('canplay', function() {
            this.classList.remove('loading');
            this.classList.add('loaded');
        });
        
        video.addEventListener('error', function() {
            // If video fails to load, show a fallback image
            const videoContainer = document.querySelector('.video-container');
            const fallbackImage = document.createElement('div');
            fallbackImage.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
                text-align: center;
            `;
            fallbackImage.innerHTML = `
                <div>
                    <h2>Shri Dinesh Group - Your Trusted Partner</h2>
                    <p>Diversified logistics and infrastructure powerhouse since 1987</p>
                </div>
            `;
            videoContainer.appendChild(fallbackImage);
        });
        
        // Optimize video performance
        video.addEventListener('loadedmetadata', function() {
            // Video metadata loaded, ready to play
            console.log('Video loaded successfully');
        });
    }

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            console.warn('Image failed to load:', this.src);
        });
    });

    // Mobile menu toggle (if needed in future)
    function createMobileMenu() {
        const header = document.querySelector('.header-container');
        const nav = document.querySelector('.navigation');
        
        if (window.innerWidth <= 768) {
            // Add mobile menu button if it doesn't exist
            if (!document.querySelector('.mobile-menu-btn')) {
                const mobileBtn = document.createElement('button');
                mobileBtn.className = 'mobile-menu-btn';
                mobileBtn.innerHTML = '☰';
                mobileBtn.style.cssText = `
                    display: none;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #000000;
                `;
                
                mobileBtn.addEventListener('click', function() {
                    nav.classList.toggle('active');
                });
                
                header.appendChild(mobileBtn);
            }
        }
    }

    // Initialize mobile menu
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVideo = document.querySelector('.hero-video');
        
        if (heroVideo) {
            const rate = scrolled * -0.5;
            heroVideo.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add click sound effect for service cards (optional)
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or menus
            const activeNav = document.querySelector('.navigation.active');
            if (activeNav) {
                activeNav.classList.remove('active');
            }
        }
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
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

    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Scroll handling logic here
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #000000, #ffffff);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Add hover effects for service cards
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Stats counter animation
    const statItems = document.querySelectorAll('.stat-item h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + '+';
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(currentValue) + '+';
                    }
                }, 30);
                
                statsObserver.unobserve(target);
            }
        });
    });

    statItems.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Force reflow and re-add animation classes to trigger animation on page load
    const leftImgs = document.querySelectorAll('.crane-img.slide-left');
    const centerImgs = document.querySelectorAll('.crane-img.slide-center');
    const rightImgs = document.querySelectorAll('.crane-img.slide-right');
    
    function restartAnimation(imgs, className) {
        imgs.forEach(img => {
            img.classList.remove(className);
            // Force reflow
            void img.offsetWidth;
            img.classList.add(className);
        });
    }
    restartAnimation(leftImgs, 'slide-left');
    restartAnimation(centerImgs, 'slide-center');
    restartAnimation(rightImgs, 'slide-right');

    console.log('Shri Dinesh Group website loaded successfully!');
}); 

// Function to open the resume popup
function openResumePopup() {
    const popup = document.getElementById('resumePopup');
    if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Function to close the resume popup
function closeResumePopup() {
    const popup = document.getElementById('resumePopup');
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Close popup when clicking outside the content
window.onclick = function(event) {
    const popup = document.getElementById('resumePopup');
    if (event.target === popup) {
        closeResumePopup();
    }
};

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        resumeForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form data
            const formData = new FormData(resumeForm);
            
            // Basic validation
            const fullName = formData.get('fullName');
            const email = formData.get('email');
            const resumeFile = formData.get('resume');
            
            if (!fullName || !email || !resumeFile) {
                alert('Please fill in all required fields and upload your resume.');
                return;
            }
            
            // In a real application, you would send the data to a server here
            // For now, we'll just show a success message
            alert('Thank you for submitting your resume! We will review it and contact you if there is a suitable position available.');
            
            // Close the popup and reset the form
            closeResumePopup();
            resumeForm.reset();
        });
    }
});