package com.Al_Imam_Uddin.Portfolio.Controller;

import com.Al_Imam_Uddin.Portfolio.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.ui.Model;
import java.util.*;

@Controller
public class PortfolioController {

    @Autowired
    private EmailService emailService;


    @GetMapping("/")
    public String home() {
        return "redirect:/overview";
    }

    @GetMapping("/overview")
    public String overview(Model model) {
        model.addAttribute("menuItems", getMenuItems("overview"));
        return "overview";
    }

    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("menuItems", getMenuItems("about"));
        return "about";
    }

    @GetMapping("/skills")
    public String skills(Model model) {
        model.addAttribute("menuItems", getMenuItems("skills"));
        model.addAttribute("mainSkills", getMainSkills());
        model.addAttribute("skillsData", getSkillsData());

        Map<String, String> skillCertificates = new HashMap<>();
        skillCertificates.put("HTML", "/static/certificate/HTML.png");
        skillCertificates.put("CSS", "/static/certificate/CSS.png");
        skillCertificates.put("CSS(Tailwind)", "/static/certificate/CSS(Tailwind).png");
        skillCertificates.put("React.js", "/static/certificate/React.js.png");
        skillCertificates.put("Node.js", "/static/certificate/Node.js.png");
        skillCertificates.put("JavaScript", "/static/certificate/JavaScript.png");
        skillCertificates.put("Spring Boot", "/static/certificate/Spring Boot.png");
        skillCertificates.put("Java", "/static/certificate/Java.png");
        skillCertificates.put("Python", "/static/certificate/Python.png");
        skillCertificates.put("Django", "/static/certificate/Django.png");
        skillCertificates.put("PHP", "/static/certificate/PHP.png");
        skillCertificates.put("Laravel", "/static/certificate/Laravel.png");

        model.addAttribute("skillCertificates", skillCertificates);
        return "skills";
    }
    @GetMapping("/services")
    public String services(Model model) {
        model.addAttribute("menuItems", getMenuItems("services"));
        return "services";
    }

    @GetMapping("/work")
    public String work(Model model) {
        model.addAttribute("menuItems", getMenuItems("work"));
        return "work";
    }

    @GetMapping("/hire")
    public String hire(Model model) {
        model.addAttribute("menuItems", getMenuItems("hire"));
        return "hire";
    }

    @PostMapping("/submit-contact")
    public String submitContact(@ModelAttribute ContactForm contactForm,
                                RedirectAttributes redirectAttributes) {
        try {
            emailService.sendContactEmail(contactForm);
            redirectAttributes.addFlashAttribute("message",
                    "Thank you for your message! I will get back to you soon.");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error",
                    "Sorry, there was an error sending your message. Please try again later.");
        }
        return "redirect:/hire";
    }

    private List<MenuItem> getMenuItems(String currentPage) {
        List<MenuItem> items = new ArrayList<>();
        items.add(new MenuItem("Overview", "/overview", "home", currentPage.equals("overview")));
        items.add(new MenuItem("About me", "/about", "user", currentPage.equals("about")));
        items.add(new MenuItem("Skills & Certifications", "/skills", "award", currentPage.equals("skills")));
        items.add(new MenuItem("My Services", "/services", "briefcase", currentPage.equals("services")));
        items.add(new MenuItem("My Work", "/work", "folder", currentPage.equals("work")));
        items.add(new MenuItem("Hire me", "/hire", "mail", currentPage.equals("hire")));
        return items;
    }

    private List<Skill> getMainSkills() {
        List<Skill> skills = new ArrayList<>();
        // Programming Languages & Technologies
        skills.add(new Skill("HTML", "code-2"));
        skills.add(new Skill("CSS", "layout"));
        skills.add(new Skill("CSS(Tailwind)", "wind")); // Removed space
        skills.add(new Skill("React.js", "react"));
        skills.add(new Skill("Node.js", "server"));
        skills.add(new Skill("JavaScript", "code"));
        skills.add(new Skill("Spring Boot", "coffee"));
        skills.add(new Skill("Java", "coffee"));
        skills.add(new Skill("Python", "code"));
        skills.add(new Skill("Django", "server"));
        skills.add(new Skill("PHP", "terminal"));
        skills.add(new Skill("Laravel", "terminal")); // Added Laravel as separate skill
        return skills;
    }
    private Map<String, List<ExpertiseCategory>> getSkillsData() {
        Map<String, List<ExpertiseCategory>> skillsData = new HashMap<>();

        // HTML Expertise
        List<ExpertiseCategory> htmlExpertise = new ArrayList<>();
        htmlExpertise.add(new ExpertiseCategory("Modern Development Skills",
                Arrays.asList("Semantic HTML structure", "Web Components",
                        "Progressive Web Apps", "Mobile-first development", "Responsive design")));
        htmlExpertise.add(new ExpertiseCategory("Performance Optimization",
                Arrays.asList("Image optimization", "Resource prioritization",
                        "Loading strategies", "Browser caching")));
        htmlExpertise.add(new ExpertiseCategory("Accessibility Expertise",
                Arrays.asList("WCAG compliance", "Screen reader optimization",
                        "Keyboard navigation", "Color contrast")));
        htmlExpertise.add(new ExpertiseCategory("SEO Knowledge",
                Arrays.asList("Semantic markup", "Meta tags", "Schema markup", "Open Graph protocol")));
        htmlExpertise.add(new ExpertiseCategory("Cross-browser Compatibility",
                Arrays.asList("Feature detection", "Polyfills", "Fallback strategies", "Browser support")));
        htmlExpertise.add(new ExpertiseCategory("Integration Skills",
                Arrays.asList("JavaScript frameworks", "CSS frameworks", "Build tools", "Version control")));
        skillsData.put("HTML", htmlExpertise);

        // CSS Expertise
        List<ExpertiseCategory> cssExpertise = new ArrayList<>();
        cssExpertise.add(new ExpertiseCategory("Layout Expertise",
                Arrays.asList("Responsive design", "Mobile-first approach", "Complex layouts",
                        "Component-based design", "Design system implementation")));
        cssExpertise.add(new ExpertiseCategory("Performance Optimization",
                Arrays.asList("CSS architecture", "Critical CSS", "Loading strategies",
                        "Animation performance", "Paint optimization")));
        cssExpertise.add(new ExpertiseCategory("Modern Development",
                Arrays.asList("CSS-in-JS", "CSS Modules", "Utility-first CSS (Tailwind)",
                        "CSS preprocessors (Sass/Less)", "PostCSS")));
        cssExpertise.add(new ExpertiseCategory("Cross-browser Development",
                Arrays.asList("Progressive enhancement", "Graceful degradation",
                        "Feature detection", "Fallback strategies", "Browser support")));
        cssExpertise.add(new ExpertiseCategory("Framework Integration",
                Arrays.asList("CSS frameworks", "Component libraries", "Design systems",
                        "Theme customization", "Dark mode implementation")));
        cssExpertise.add(new ExpertiseCategory("Advanced Techniques",
                Arrays.asList("CSS custom properties", "CSS Houdini", "CSS Grid systems",
                        "Animation libraries", "Micro-interactions")));
        cssExpertise.add(new ExpertiseCategory("Development Tools",
                Arrays.asList("Browser DevTools", "CSS debugging", "Performance profiling",
                        "CSS linting", "Build optimization")));
        skillsData.put("CSS", cssExpertise);

        // CSS(Tailwind) Expertise
        List<ExpertiseCategory> tailwindExpertise = new ArrayList<>();
        tailwindExpertise.add(new ExpertiseCategory("Component Architecture",
                Arrays.asList("Reusable Components", "Composition Patterns", "State Variants",
                        "Responsive Patterns", "Dark Mode Patterns")));
        tailwindExpertise.add(new ExpertiseCategory("Responsive Design",
                Arrays.asList("Breakpoint System", "Mobile-first Approach", "Container Queries",
                        "Fluid Typography", "Adaptive Layouts")));
        tailwindExpertise.add(new ExpertiseCategory("Performance Techniques",
                Arrays.asList("CSS Purging", "Layer Organization", "Critical CSS",
                        "Code Splitting", "Cache Optimization")));
        tailwindExpertise.add(new ExpertiseCategory("Testing & Quality",
                Arrays.asList("Visual Regression Testing", "Accessibility Testing",
                        "Performance Monitoring", "Style Linting", "Documentation Generation")));
        skillsData.put("CSS(Tailwind)", tailwindExpertise);

        // React.js Expertise
        List<ExpertiseCategory> reactExpertise = new ArrayList<>();
        reactExpertise.add(new ExpertiseCategory("Core Expertise",
                Arrays.asList("Server Components expertise", "Understanding of React 18 features",
                        "Experience with React hooks", "Knowledge of state management",
                        "Performance optimization", "Integration with TypeScript")));
        skillsData.put("React.js", reactExpertise);

        // Node.js Expertise
        List<ExpertiseCategory> nodeExpertise = new ArrayList<>();
        nodeExpertise.add(new ExpertiseCategory("Core Capabilities",
                Arrays.asList("Microservices architecture", "RESTful API development",
                        "Real-time applications", "Database integration",
                        "Security implementation", "Performance optimization",
                        "Docker containerization")));
        skillsData.put("Node.js", nodeExpertise);

        // JavaScript Expertise
        List<ExpertiseCategory> jsExpertise = new ArrayList<>();
        jsExpertise.add(new ExpertiseCategory("Core Skills",
                Arrays.asList("Framework Expertise", "Modern Development Patterns",
                        "Performance Optimization", "Architectural Patterns",
                        "API Integrations")));
        skillsData.put("JavaScript", jsExpertise);

        // Spring Boot Expertise
        List<ExpertiseCategory> springBootExpertise = new ArrayList<>();
        springBootExpertise.add(new ExpertiseCategory("Technical Skills",
                Arrays.asList("Microservices architecture", "RESTful API development",
                        "Spring Cloud knowledge", "Docker containerization",
                        "Kubernetes orchestration", "CI/CD pipeline integration",
                        "Testing (JUnit)")));
        springBootExpertise.add(new ExpertiseCategory("Latest Features",
                Arrays.asList("Native compilation", "Cloud-native development",
                        "Reactive programming", "Event-driven architecture",
                        "GraphQL integration")));
        springBootExpertise.add(new ExpertiseCategory("Enterprise Integration",
                Arrays.asList("Message queues (RabbitMQ, Kafka)", "Cache systems (Redis)",
                        "Service discovery", "Load balancing", "Circuit breakers")));
        skillsData.put("Spring Boot", springBootExpertise);

        // Java Expertise
        List<ExpertiseCategory> javaExpertise = new ArrayList<>();
        javaExpertise.add(new ExpertiseCategory("Modern Java Features",
                Arrays.asList("Lambda expressions & Stream API", "Optional class for null handling",
                        "Virtual Threads (Project Loom)", "Pattern Matching and Records",
                        "Switch Expressions", "Module System")));
        skillsData.put("Java", javaExpertise);

        // Python Expertise
        List<ExpertiseCategory> pythonExpertise = new ArrayList<>();
        pythonExpertise.add(new ExpertiseCategory("Data Science Libraries",
                Arrays.asList("NumPy for numerical computing", "Pandas for data manipulation",
                        "Matplotlib/Seaborn for visualization", "Scikit-learn for traditional ML",
                        "SciPy for scientific computing")));
        pythonExpertise.add(new ExpertiseCategory("Deep Learning Frameworks",
                Arrays.asList("PyTorch", "TensorFlow 2.x", "Keras",
                        "Hugging Face Transformers", "Fast.ai")));
        pythonExpertise.add(new ExpertiseCategory("MLOps Skills",
                Arrays.asList("Model versioning (DVC)", "Model deployment",
                        "MLflow for experiment tracking", "Weight & Biases for monitoring",
                        "Docker containerization")));
        skillsData.put("Python", pythonExpertise);

        // Django Expertise
        List<ExpertiseCategory> djangoExpertise = new ArrayList<>();
        djangoExpertise.add(new ExpertiseCategory("Core Django Features",
                Arrays.asList("Django REST Framework (DRF)", "ORM (Object-Relational Mapping)",
                        "Authentication & Authorization", "Class-Based Views",
                        "Django Forms & ModelForms", "Template System")));
        djangoExpertise.add(new ExpertiseCategory("Database Management",
                Arrays.asList("Database migrations", "Complex queries optimization",
                        "Multiple database support", "PostgreSQL integration",
                        "Redis caching", "Database indexing")));
        djangoExpertise.add(new ExpertiseCategory("API Development",
                Arrays.asList("RESTful API design", "API versioning",
                        "Serializers", "ViewSets", "API documentation (Swagger/OpenAPI)",
                        "GraphQL integration")));
        skillsData.put("Django", djangoExpertise);

        // PHP Expertise
        List<ExpertiseCategory> phpExpertise = new ArrayList<>();
        phpExpertise.add(new ExpertiseCategory("Modern PHP Features",
                Arrays.asList("Named arguments", "Attributes (Annotations)",
                        "Constructor property promotion", "Match expressions",
                        "Nullsafe operator", "JIT compilation")));
        phpExpertise.add(new ExpertiseCategory("Framework Knowledge",
                Arrays.asList("WordPress development", "CodeIgniter",
                        "API Platform", "Composer package management")));
        phpExpertise.add(new ExpertiseCategory("Security Features",
                Arrays.asList("XSS prevention", "SQL injection prevention",
                        "CSRF protection", "Password hashing",
                        "Input validation", "Session security")));
        skillsData.put("PHP", phpExpertise);

        // Laravel Expertise
        List<ExpertiseCategory> laravelExpertise = new ArrayList<>();
        laravelExpertise.add(new ExpertiseCategory("Core Laravel Features",
                Arrays.asList("Routing and Middleware", "Eloquent ORM (Relationships, Eager Loading)",
                        "Blade Templating", "Artisan CLI", "Validation")));
        laravelExpertise.add(new ExpertiseCategory("Advanced Laravel Concepts",
                Arrays.asList("Queues and Jobs", "Event-Driven Development",
                        "Task Scheduling", "API Development (REST, Passport/Sanctum)",
                        "Testing (Unit, Feature)")));
        skillsData.put("Laravel", laravelExpertise);

        return skillsData;
    }

    private List<Certificate> getCertificates() {
        List<Certificate> certificates = new ArrayList<>();

        return certificates;
    }
}

// Model classes
class MenuItem {
    private String name;
    private String url;
    private String icon;
    private boolean active;

    public MenuItem(String name, String url, String icon, boolean active) {
        this.name = name;
        this.url = url;
        this.icon = icon;
        this.active = active;
    }

    // Getters
    public String getName() { return name; }
    public String getUrl() { return url; }
    public String getIcon() { return icon; }
    public boolean isActive() { return active; }
}

class Skill {
    private String name;
    private String icon;

    public Skill(String name, String icon) {
        this.name = name;
        this.icon = icon;
    }

    // Getters
    public String getName() { return name; }
    public String getIcon() { return icon; }
}

class ExpertiseCategory {
    private String title;
    private List<String> items;

    public ExpertiseCategory(String title, List<String> items) {
        this.title = title;
        this.items = items;
    }

    // Getters
    public String getTitle() { return title; }
    public List<String> getItems() { return items; }
}

class Certificate {
    private String name;
    private String issuer;
    private String icon;
    private List<String> tags;
    private String description;

    public Certificate(String name, String issuer, String icon, List<String> tags, String description) {
        this.name = name;
        this.issuer = issuer;
        this.icon = icon;
        this.tags = tags;
        this.description = description;
    }

    // Getters
    public String getName() { return name; }
    public String getIssuer() { return issuer; }
    public String getIcon() { return icon; }
    public List<String> getTags() { return tags; }
    public String getDescription() { return description; }
}
