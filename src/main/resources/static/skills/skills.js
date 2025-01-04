// Define global variables
let currentSkill = null;
let skillsData = {};
let certificatesData = [];
let skillCertificates = {};

// Skill icons mapping with their brand colors
const skillIcons = {
    'HTML': {
        icon: '<i class="fab fa-html5"></i>',
        color: '#E34F26'
    },
    'CSS': {
        icon: '<i class="fab fa-css3-alt"></i>',
        color: '#1572B6'
    },
    'JavaScript': {
        icon: '<i class="fab fa-js"></i>',
        color: '#F7DF1E'
    },
    'React.js': {
        icon: '<i class="fab fa-react"></i>',
        color: '#61DAFB'
    },
    'Node.js': {
        icon: '<i class="fab fa-node-js"></i>',
        color: '#339933'
    },
    'Python': {
        icon: '<i class="fab fa-python"></i>',
        color: '#3776AB'
    },
    'Java': {
        icon: '<i class="fab fa-java"></i>',
        color: '#007396'
    },
    'PHP': {
        icon: '<i class="fab fa-php"></i>',
        color: '#777BB4'
    },
    'Laravel': {
        icon: '<i class="fab fa-laravel"></i>',
        color: '#FF2D20'
    },
    'Django': {
        icon: '<i class="fab fa-python"></i>',
        color: '#092E20'
    }
};

// Initialize the skills page
function initializeSkillsPage() {
    try {
        // Get data from window object or use defaults
        skillsData = window.skillsData || {};
        certificatesData = window.certificatesData || [];
        skillCertificates = getSkillCertificates();

        // Initialize everything
        loadSkills();
        loadCertificates();
        initializeEventListeners();
        initializeAnimations();
    } catch (error) {
        console.error('Error initializing skills page:', error);
    }
}

// Get skill certificates data
function getSkillCertificates() {
    return window.skillCertificates || {
        'HTML': '/static/certificate/HTML.png',
        'CSS': '/static/certificate/CSS.png',
        'CSS(Tailwind)': '/static/certificate/CSS(Tailwind).png',
        'React.js': '/static/certificate/React.js.png',
        'Node.js': '/static/certificate/Node.js.png',
        'JavaScript': '/static/certificate/JavaScript.png',
        'Spring Boot': '/static/certificate/Spring Boot.png',
        'Java': '/static/certificate/Java.png',
        'Python': '/static/certificate/Python.png',
        'Django': '/static/certificate/Django.png',
        'PHP': '/static/certificate/PHP.png',
        'Laravel': '/static/certificate/Laravel.png'
    };
}

// Load skills into the container
function loadSkills() {
    const container = document.getElementById('skillsContainer');
    if (!container) return;

    container.innerHTML = '';
    const skills = Object.keys(skillsData);

    skills.forEach((skill, index) => {
        const skillCard = createSkillCard(skill, index);
        container.appendChild(skillCard);
    });

    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Create an enhanced skill card
function createSkillCard(skillName, index) {
    const div = document.createElement('div');
    div.className = 'skill-card cursor-pointer transform transition-all duration-300';
    div.setAttribute('data-skill', skillName);
    div.style.animationDelay = `${index * 0.1}s`;

    const skillIcon = skillIcons[skillName] || {
        icon: '<i class="fas fa-code"></i>',
        color: '#0ea5e9'
    };

    div.innerHTML = `
        <div class="flex items-center justify-between p-6 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 group">
            <div class="flex items-center space-x-4">
                <div class="skill-icon text-3xl transition-transform duration-300 group-hover:scale-110" style="color: ${skillIcon.color}">
                    ${skillIcon.icon}
                </div>
                <div class="flex flex-col">
                    <span class="font-medium text-lg text-gray-900 dark:text-gray-100">${skillName}</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">Click to view expertise</span>
                </div>
            </div>
            <div class="transform transition-transform duration-300 group-hover:translate-x-1">
                <i data-feather="chevron-right" class="w-5 h-5 text-primary-600 dark:text-primary-400"></i>
            </div>
        </div>
    `;

    div.addEventListener('click', () => {
        showExpertise(skillName);
        updateCertificatesView(skillName);
    });

    return div;
}

// Show expertise in an enhanced modal
function showExpertise(skillName) {
    currentSkill = skillName;
    const skillIcon = skillIcons[skillName] || {
        icon: '<i class="fas fa-code"></i>',
        color: '#0ea5e9'
    };

    const modalHtml = `
        <div class="expertise-modal" id="expertiseModal">
            <div class="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-4">
                        <div class="skill-icon text-4xl" style="color: ${skillIcon.color}">
                            ${skillIcon.icon}
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100">${skillName}</h3>
                            <p class="text-gray-500 dark:text-gray-400">Expertise Overview</p>
                        </div>
                    </div>
                    <button class="close-expertise-btn p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <i data-feather="x" class="w-6 h-6"></i>
                    </button>
                </div>
                <div class="expertise-content space-y-6 max-h-[70vh] overflow-y-auto">
                    ${generateExpertiseContent(skillName)}
                </div>
                ${generateCertificateSection(skillName)}
            </div>
        </div>
        <div class="modal-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm z-[999]"></div>
    `;

    // Remove existing modal if present
    const existingModal = document.getElementById('expertiseModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add new modal
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container fixed inset-0 z-[1000] overflow-y-auto';
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);

    // Add event listeners for closing
    const closeBtn = modalContainer.querySelector('.close-expertise-btn');
    const backdrop = modalContainer.querySelector('.modal-backdrop');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeExpertise);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeExpertise);
    }

    // Activate modal with animation
    setTimeout(() => {
        const modal = document.getElementById('expertiseModal');
        if (modal) {
            modal.classList.add('active');
        }
    }, 50);

    // Initialize Feather Icons for the new content
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Generate expertise content
function generateExpertiseContent(skillName) {
    const skillData = skillsData[skillName];
    if (!skillData) return '';

    return skillData.map((category, index) => `
        <div class="expertise-category p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl" style="animation-delay: ${index * 0.1}s">
            <h4 class="text-lg font-semibold mb-4 text-primary-600 dark:text-primary-400 flex items-center space-x-2">
                <i data-feather="${getCategoryIcon(category.title)}" class="w-5 h-5"></i>
                <span>${category.title}</span>
            </h4>
            <div class="space-y-3">
                ${category.items.map(item => `
                    <div class="flex items-center space-x-3 p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <div class="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                            <i data-feather="check" class="w-4 h-4 text-primary-600 dark:text-primary-400"></i>
                        </div>
                        <span class="text-gray-700 dark:text-gray-300">${item}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Get appropriate icon for category
function getCategoryIcon(categoryTitle) {
    const iconMap = {
        'Core Concepts': 'book',
        'Advanced Features': 'star',
        'Best Practices': 'check-circle',
        'Tools & Environment': 'tool',
        'Frameworks': 'box',
        'Development': 'code',
        'Testing': 'test-tube',
        'Deployment': 'upload-cloud'
    };

    return iconMap[categoryTitle] || 'info';
}

// Generate certificate section
function generateCertificateSection(skillName) {
    const certificatePath = skillCertificates[skillName];
    if (!certificatePath) return '';

    return `
        <div class="mt-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <h4 class="text-lg font-semibold mb-4 text-primary-600 dark:text-primary-400 flex items-center space-x-2">
                <i data-feather="award" class="w-5 h-5"></i>
                <span>Certification</span>
            </h4>
            <div class="relative group">
                <img src="${certificatePath}"
                     alt="${skillName} Certificate"
                     class="w-full h-auto rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                     onerror="this.parentElement.style.display='none'"
                />
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a href="${certificatePath}"
                       target="_blank"
                       class="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-300">
                        View Full Size
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Load certificates
function loadCertificates() {
    const container = document.getElementById('certificatesContainer');
    if (!container) return;

    container.innerHTML = '';
    certificatesData.forEach((cert, index) => {
        const certCard = createCertificateCard(cert, index);
        container.appendChild(certCard);
    });

    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Create an enhanced certificate card
function createCertificateCard(cert, index) {
    const div = document.createElement('div');
    div.className = 'certificate-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1';
    div.style.animationDelay = `${index * 0.1}s`;

    div.innerHTML = `
        <div class="p-1 bg-gradient-to-r from-primary-500 to-primary-700"></div>
        <div class="p-6">
            <div class="flex items-center mb-4">
                <div class="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mr-4">
                    <i data-feather="${cert.icon}" class="w-6 h-6 text-primary-600 dark:text-primary-400"></i>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">${cert.name}</h3>
                    <p class="text-gray-600 dark:text-gray-400">${cert.issuer}</p>
                </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
                ${cert.tags.map(tag => `
                    <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                        ${tag}
                    </span>
                `).join('')}
            </div>
            <p class="text-gray-600 dark:text-gray-400">${cert.description}</p>
        </div>
    `;

    return div;
}

// Update certificates view based on selected skill
function updateCertificatesView(skillName) {
    const container = document.getElementById('certificatesContainer');
    if (!container) return;

    const relevantCerts = certificatesData.filter(cert =>
        cert.tags.some(tag => tag.toLowerCase().includes(skillName.toLowerCase()))
    );

    container.innerHTML = '';
    relevantCerts.forEach((cert, index) => {
        const certCard = createCertificateCard(cert, index);
        container.appendChild(certCard);
    });

    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Close expertise modal
function closeExpertise() {
    const modal = document.getElementById('expertiseModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.parentElement.remove();
        }, 300);
    }
}

// Initialize event listeners
// Initialize event listeners
function initializeEventListeners() {
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeExpertise();
        }
    });

    // Initialize intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.skill-card, .certificate-card').forEach(el => {
        observer.observe(el);
    });

    // Handle dark mode transitions for skill cards
    const darkModeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const isDark = document.documentElement.classList.contains('dark');
                updateDarkModeStyles(isDark);
            }
        });
    });

    darkModeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
}
// Initialize animations
function initializeAnimations() {
    // Add progress bar animations
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        const fill = bar.querySelector('.progress-fill');
        if (fill) {
            fill.style.width = `${percentage}%`;
        }
    });

    // Add floating animations to decorative elements
    const floatingElements = document.querySelectorAll('.floating-animation');
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });

    // Add hover animations to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.classList.add('scale-105');
            category.style.transform = 'translateY(-5px)';
        });

        category.addEventListener('mouseleave', () => {
            category.classList.remove('scale-105');
            category.style.transform = 'translateY(0)';
        });
    });
}

// Update dark mode specific styles
function updateDarkModeStyles(isDark) {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        if (isDark) {
            card.classList.add('dark-mode');
            card.style.backgroundColor = 'rgba(31, 41, 55, 0.8)';
        } else {
            card.classList.remove('dark-mode');
            card.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        }
    });
}

// Add smooth scrolling to expertise sections
function smoothScrollToExpertise(expertiseId) {
    const element = document.getElementById(expertiseId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle window resize for responsive adjustments
window.addEventListener('resize', debounce(() => {
    adjustLayoutForScreenSize();
}, 250));

// Debounce function for performance
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

// Adjust layout based on screen size
function adjustLayoutForScreenSize() {
    const expertiseModal = document.getElementById('expertiseModal');
    if (expertiseModal) {
        const windowHeight = window.innerHeight;
        const modalContent = expertiseModal.querySelector('.expertise-content');
        if (modalContent) {
            modalContent.style.maxHeight = `${windowHeight * 0.7}px`;
        }
    }
}

// Initialize skills page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing skills page...');
    initializeSkillsPage();
});