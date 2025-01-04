package com.Al_Imam_Uddin.Portfolio.Controller;

public class ContactForm {
    private String name;
    private String email;
    private String projectType;
    private String budget;
    private String timeline;
    private String message;

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getProjectType() { return projectType; }
    public void setProjectType(String projectType) { this.projectType = projectType; }

    public String getBudget() { return budget; }
    public void setBudget(String budget) { this.budget = budget; }

    public String getTimeline() { return timeline; }
    public void setTimeline(String timeline) { this.timeline = timeline; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}