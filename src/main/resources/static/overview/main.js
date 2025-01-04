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

// Improved Sidebar Toggle with Overlay
function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    function toggleSidebar(show) {
        if (show) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
            setTimeout(() => {
                overlay.classList.add('opacity-100');
            }, 0);
        } else {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.remove('opacity-100');
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 300);
        }
    }

    // Toggle sidebar when menu button is clicked
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = sidebar.classList.contains('-translate-x-full');
        toggleSidebar(isHidden);
    });

    // Close sidebar when overlay is clicked
    overlay.addEventListener('click', () => {
        toggleSidebar(false);
    });

    // Close sidebar when ESC key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleSidebar(false);
        }
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            toggleSidebar(false);
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth >= 1024) { // lg breakpoint
                toggleSidebar(false);
            }
        }, 250);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
    initDarkMode();
    initSidebar();
});