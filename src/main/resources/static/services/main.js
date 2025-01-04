/* main.js */
// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('service-card')) {
        entry.target.style.transitionDelay = `${entry.target.dataset.delay}ms`;
      }
    }
  });
}, observerOptions);

// Initialize animations
function initAnimations() {
  const elements = document.querySelectorAll('.service-card, .feature-item');
  elements.forEach((el, index) => {
    el.dataset.delay = index * 100;
    observer.observe(el);
  });
}

// Enhanced Dark Mode Toggle
function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const html = document.documentElement;
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (localStorage.getItem('darkMode') === null) {
    localStorage.setItem('darkMode', isDarkMode);
  }

  const darkMode = localStorage.getItem('darkMode') === 'true';
  html.classList.toggle('dark', darkMode);

  darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('darkMode', html.classList.contains('dark'));
    updateThemeIcon();
  });

  updateThemeIcon();
}

function updateThemeIcon() {
  const moonIcon = document.querySelector('[data-feather="moon"]');
  const sunIcon = document.querySelector('[data-feather="sun"]');
  const isDark = document.documentElement.classList.contains('dark');

  moonIcon.style.display = isDark ? 'none' : 'block';
  sunIcon.style.display = isDark ? 'block' : 'none';
  feather.replace();
}

// Enhanced Sidebar
function initSidebar() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-30 hidden';
  document.body.appendChild(overlay);

  menuToggle.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', closeSidebar);

  function toggleSidebar() {
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  }

  function closeSidebar() {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  feather.replace();
  initDarkMode();
  initSidebar();
  initAnimations();
});
