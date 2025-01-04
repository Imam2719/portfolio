package com.Al_Imam_Uddin.Portfolio.Service;

import com.Al_Imam_Uddin.Portfolio.Controller.ContactForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${contact.email}")
    private String toEmail;

    public void sendContactEmail(ContactForm form) {
        try {
            // Send email to portfolio owner
            SimpleMailMessage ownerMessage = new SimpleMailMessage();
            ownerMessage.setFrom(fromEmail);
            ownerMessage.setTo(toEmail);
            ownerMessage.setSubject("Portfolio Job Contact");
            ownerMessage.setText(buildEmailContentForOwner(form));
            emailSender.send(ownerMessage);

            // Send confirmation email to the contact form submitter
            SimpleMailMessage submitterMessage = new SimpleMailMessage();
            submitterMessage.setFrom(fromEmail);
            submitterMessage.setTo(form.getEmail());
            submitterMessage.setSubject("Thank you for your inquiry");
            submitterMessage.setText(buildEmailContentForSubmitter(form));
            emailSender.send(submitterMessage);

        } catch (Exception e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
        }
    }

    private String buildEmailContentForOwner(ContactForm form) {
        return String.format("""
            New contact form submission from your portfolio:
            
            Name: %s
            Email: %s
            Project Type: %s
            Budget Range: %s
            Expected Timeline: %s
            
            Project Details:
            %s
            """,
                form.getName(),
                form.getEmail(),
                form.getProjectType(),
                form.getBudget(),
                form.getTimeline(),
                form.getMessage()
        );
    }

    private String buildEmailContentForSubmitter(ContactForm form) {
        return String.format("""
            Dear %s,
            
            Thank you for contacting me through my portfolio website. I have received your inquiry and will review it shortly.
            
            Here's a summary of your submission:
            Project Type: %s
            Budget Range: %s
            Expected Timeline: %s
            
            I will get back to you as soon as possible at this email address.
            
            Best regards,
            Al Imam Uddin
            """,
                form.getName(),
                form.getProjectType(),
                form.getBudget(),
                form.getTimeline()
        );
    }
}