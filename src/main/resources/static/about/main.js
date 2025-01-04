// File: src/main/resources/static/about/main.js

document.addEventListener('DOMContentLoaded', () => {
    initializeFeatures();
});

function initializeFeatures() {
    feather.replace();
    initDarkMode();
    initSidebar();
    initAnimations();
    initScrollEffects();
    initJourneyCards();
    initParallaxEffects();
    initHoverEffects();
    initSmoothScroll();
}

// Dark Mode Implementation
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    const setDarkMode = (isDark) => {
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
        updateUIForTheme(isDark);
        feather.replace();
    };

    // Check saved preference or system preference
    const savedDarkMode = localStorage.getItem('darkMode');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDarkMode)) {
        setDarkMode(true);
    }

    darkModeToggle.addEventListener('click', () => {
        const isDark = !html.classList.contains('dark');
        setDarkMode(isDark);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('darkMode') === null) {
            setDarkMode(e.matches);
        }
    });
}

// Update UI elements based on theme
function updateUIForTheme(isDark) {
    const elements = {
        navbar: document.querySelector('nav'),
        journeyCards: document.querySelectorAll('.journey-card'),
        icons: document.querySelectorAll('.journey-icon'),
        timeline: document.querySelector('.timeline-connector')
    };

    if (isDark) {
        elements.navbar.classList.add('dark:bg-gray-800/80');
        elements.navbar.classList.remove('bg-white/80');
        elements.journeyCards.forEach(card => {
            card.classList.add('dark:bg-gray-800/50');
            card.classList.add('dark:border-gray-700');
        });
        elements.timeline?.classList.add('dark:bg-primary-400/20');
    } else {
        elements.navbar.classList.add('bg-white/80');
        elements.navbar.classList.remove('dark:bg-gray-800/80');
        elements.journeyCards.forEach(card => {
            card.classList.remove('dark:bg-gray-800/50');
            card.classList.remove('dark:border-gray-700');
        });
        elements.timeline?.classList.remove('dark:bg-primary-400/20');
    }
}

// Enhanced Sidebar Implementation
function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarLinks = sidebar.querySelectorAll('a');
    let touchStartX = 0;
    let touchEndX = 0;

    const toggleSidebar = (show) => {
        const action = show ? 'remove' : 'add';
        sidebar.classList[action]('-translate-x-full');
        overlay.classList[action]('hidden');
        document.body.style.overflow = show ? 'hidden' : '';

        if (show) {
            overlay.classList.remove('opacity-0');
            overlay.classList.add('opacity-100');
            sidebar.classList.add('shadow-2xl');
        } else {
            overlay.classList.remove('opacity-100');
            overlay.classList.add('opacity-0');
            setTimeout(() => {
                sidebar.classList.remove('shadow-2xl');
            }, 300);
        }
    };

    // Click handlers
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = sidebar.classList.contains('-translate-x-full');
        toggleSidebar(isHidden);
    });

    overlay.addEventListener('click', () => toggleSidebar(false));

    // Touch gesture handlers
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipeGesture();
    });

    function handleSwipeGesture() {
        const swipeDistance = touchEndX - touchStartX;
        const threshold = 100;

        if (Math.abs(swipeDistance) > threshold) {
            if (swipeDistance > 0) {
                toggleSidebar(true);
            } else {
                toggleSidebar(false);
            }
        }
    }

    // Handle links in sidebar
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                toggleSidebar(false);
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !sidebar.classList.contains('-translate-x-full')) {
            toggleSidebar(false);
        }
    });

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth >= 1024) {
                toggleSidebar(false);
            }
        }, 250);
    });
}

// Journey Cards Animation
function initJourneyCards() {
    const cards = document.querySelectorAll('.journey-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up', 'opacity-100');
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
        card.classList.add('opacity-0', 'translate-y-8');
        observer.observe(card);
    });
}

// Parallax Effects
function initParallaxEffects() {
    const icons = document.querySelectorAll('.journey-icon');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                icons.forEach(icon => {
                    const rect = icon.getBoundingClientRect();
                    const scrollPercent = rect.top / window.innerHeight;

                    if (scrollPercent > 0 && scrollPercent < 1) {
                        const rotation = scrollPercent * 10;
                        const scale = 1 + scrollPercent * 0.1;
                        icon.style.transform = `rotate(${rotation}deg) scale(${scale})`;
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Hover Effects
function initHoverEffects() {
    const cards = document.querySelectorAll('.journey-card');
    const icons = document.querySelectorAll('.journey-icon');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('transform', 'scale-102', 'shadow-lg');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('transform', 'scale-102', 'shadow-lg');
        });
    });

    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('animate-pulse-soft');
        });

        icon.addEventListener('mouseleave', () => {
            icon.classList.remove('animate-pulse-soft');
        });
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const nav = document.querySelector('nav');
    let lastScroll = 0;
    let scrollTimer;

    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);

        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.classList.remove('shadow-lg', '-translate-y-full');
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            nav.classList.add('-translate-y-full');
            nav.classList.remove('shadow-lg');
        } else {
            // Scrolling up
            nav.classList.remove('-translate-y-full');
            if (currentScroll > 100) {
                nav.classList.add('shadow-lg');
            }
        }

        scrollTimer = setTimeout(() => {
            lastScroll = currentScroll;
        }, 50);
    });
}

// General Animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.animate;
                element.classList.add(animation);
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}