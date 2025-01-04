// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial setup
    initFeatherIcons();
    initDarkMode();
    initSidebar();
    initSkillCards();
    initScrollAnimations();
});

// Initialize Feather Icons
function initFeatherIcons() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}
// Initialize Feather Icons
function initFeatherIcons() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    function setDarkMode(isDark) {
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
        feather.replace();
    }

    const savedDarkMode = localStorage.getItem('darkMode');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDarkMode)) {
        setDarkMode(true);
    }

    darkModeToggle.addEventListener('click', () => {
        const isDark = !html.classList.contains('dark');
        setDarkMode(isDark);
    });
}
// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFeatherIcons();
    initDarkMode();
    initSidebar();
    initSkillCards();
    initScrollAnimations();
});
// Sidebar Management
function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    function toggleSidebar(show = true) {
        requestAnimationFrame(() => {
            if (show) {
                sidebar.classList.remove('-translate-x-full');
                overlay.classList.remove('hidden');
                requestAnimationFrame(() => {
                    overlay.classList.add('opacity-100');
                });
            } else {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.remove('opacity-100');
                setTimeout(() => {
                    overlay.classList.add('hidden');
                }, 300);
            }
        });
    }

    // Menu button click
    menuToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = sidebar.classList.contains('-translate-x-full');
        toggleSidebar(isHidden);
    });

    // Close on overlay click
    overlay?.addEventListener('click', () => toggleSidebar(false));

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleSidebar(false);
        }
    });

    // Handle touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchend', () => {
        const swipeDistance = Math.abs(touchEndX - touchStartX);
        const threshold = 100; // minimum swipe distance

        if (swipeDistance > threshold) {
            if (!sidebar.classList.contains('-translate-x-full')) {
                // Swipe left to close
                if (touchEndX < touchStartX) {
                    toggleSidebar(false);
                }
            } else {
                // Swipe right to open (only when starting near left edge)
                if (touchEndX > touchStartX && touchStartX < 50) {
                    toggleSidebar(true);
                }
            }
        }
    });
}

// Skills Cards Management
function initSkillCards() {
  // Should be empty
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => observer.observe(element));
}

// Utility function to close expertise panel
// Updated closeExpertise function
function closeExpertise() {
    const modal = document.getElementById('expertiseModal');
    if (modal) {
        // First remove the active class to trigger the fade-out animation
        modal.classList.remove('active');

        // Wait for animation to complete before removing the modal
        setTimeout(() => {
            // Remove the entire modal container including the backdrop
            const modalContainer = modal.parentElement;
            if (modalContainer) {
                modalContainer.remove();
            }
        }, 300); // Match this with your CSS transition duration
    }

    // Also remove active state from skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        card.classList.remove('active-skill');
    });
}
