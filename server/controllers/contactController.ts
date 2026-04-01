import { Request, Response } from "express";
import { ContactMessage, NewsletterSubscription } from "../types.ts";
import { contactMessages, newsletterSubscriptions } from "../data.ts";
import nodemailer from "nodemailer";

// Email transporter configuration
// Note: In a real production app, you would provide these via environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage: ContactMessage = {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    contactMessages.push(newMessage);
    console.log("New contact message received:", newMessage);

    // Send email notification
    const recipientEmail = "fenneccrop3.0@gmail.com";
    
    const mailOptions = {
      from: process.env.EMAIL_USER, // Always send from the configured account
      to: recipientEmail,
      replyTo: email, // Allow replying directly to the sender
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to ${recipientEmail}`);
      } else {
        console.warn("Email credentials not configured. Skipping real email sending.");
        console.log(`[MOCK EMAIL] To: ${recipientEmail}, Subject: ${mailOptions.subject}`);
      }
    } catch (mailError) {
      console.error("Error sending email:", mailError);
      // We don't fail the whole request if email fails, as the message is saved in the dashboard
    }

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    res.status(500).json({ message: "Error submitting contact form" });
  }
};

export const subscribeNewsletter = (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const newSubscription: NewsletterSubscription = {
      email,
      subscribedAt: new Date().toISOString(),
    };

    newsletterSubscriptions.push(newSubscription);
    console.log("New newsletter subscription received:", newSubscription);

    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error subscribing to newsletter" });
  }
};
