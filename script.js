// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    header.style.transition = 'transform 0.3s ease-in-out';

    // Service card animations
    const serviceCards = document.querySelectorAll('.service-card');
    
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
        video.classList.add('loading');
        video.addEventListener('loadstart', function() {
            this.classList.add('loading');
        });
        video.addEventListener('canplay', function() {
            this.classList.remove('loading');
            this.classList.add('loaded');
        });
        video.addEventListener('error', function() {
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
        video.addEventListener('loadedmetadata', function() {
            console.log('Video loaded successfully');
        });
    }

    // Loading animation for images
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

    // Mobile hamburger menu
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburgerBtn.classList.toggle('open', isOpen);
        hamburgerBtn.setAttribute('aria-expanded', isOpen);

        // Position drawer exactly below the header
        if (isOpen) {
            const headerBottom = header.getBoundingClientRect().bottom;
            mobileMenu.style.top = headerBottom + 'px';
        }
    });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                hamburgerBtn.classList.remove('open');
                hamburgerBtn.setAttribute('aria-expanded', false);
            });
        });
    }

    // Escape key closes hamburger menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (mobileMenu) {
                mobileMenu.classList.remove('open');
                if (hamburgerBtn) {
                    hamburgerBtn.classList.remove('open');
                    hamburgerBtn.setAttribute('aria-expanded', false);
                }
            }
        }
    });

    // Escape key closes hamburger menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (mobileMenu) {
                mobileMenu.classList.remove('open');
                if (hamburgerBtn) {
                    hamburgerBtn.classList.remove('open');
                    hamburgerBtn.setAttribute('aria-expanded', false);
                }
            }
        }
    });

    // Reposition mobile drawer on scroll
    window.addEventListener('scroll', function() {
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            const headerBottom = header.getBoundingClientRect().bottom;
            mobileMenu.style.top = headerBottom + 'px';
        }
    });

    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            const rate = scrolled * -0.5;
            heroVideo.style.transform = `translateY(${rate}px)`;
        }
    });

    // Service card click effect
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
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

    // Debounce utility
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

    const debouncedScrollHandler = debounce(function() {}, 10);
    window.addEventListener('scroll', debouncedScrollHandler);

    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #000000, #555555);
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

    // Service card hover effects
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
    statItems.forEach(stat => statsObserver.observe(stat));

    // Crane animations
    const leftImgs = document.querySelectorAll('.crane-img.slide-left');
    const centerImgs = document.querySelectorAll('.crane-img.slide-center');
    const rightImgs = document.querySelectorAll('.crane-img.slide-right');
    
    function restartAnimation(imgs, className) {
        imgs.forEach(img => {
            img.classList.remove(className);
            void img.offsetWidth;
            img.classList.add(className);
        });
    }
    restartAnimation(leftImgs, 'slide-left');
    restartAnimation(centerImgs, 'slide-center');
    restartAnimation(rightImgs, 'slide-right');

    console.log('Shri Dinesh Group website loaded successfully!');
});

// Resume popup functions
function openResumePopup() {
    const popup = document.getElementById('resumePopup');
    if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeResumePopup() {
    const popup = document.getElementById('resumePopup');
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

window.onclick = function(event) {
    const popup = document.getElementById('resumePopup');
    if (event.target === popup) {
        closeResumePopup();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        resumeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(resumeForm);
            const fullName = formData.get('fullName');
            const email = formData.get('email');
            const resumeFile = formData.get('resume');
            if (!fullName || !email || !resumeFile) {
                alert('Please fill in all required fields and upload your resume.');
                return;
            }
            alert('Thank you for submitting your resume! We will review it and contact you if there is a suitable position available.');
            closeResumePopup();
            resumeForm.reset();
        });
    }
});